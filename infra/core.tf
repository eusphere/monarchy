data "aws_vpc" "default" {
  default = true
}
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_subnets" "public" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
  filter {
    name   = "map-public-ip-on-launch"
    values = ["true"]
  }
}

locals {
  private_subnets = {
    a = { cidr = "172.31.96.0/20", az = "us-east-1a" }
    b = { cidr = "172.31.112.0/20", az = "us-east-1b" }
    c = { cidr = "172.31.128.0/20", az = "us-east-1c" }
  }
}

resource "aws_subnet" "private" {
  for_each = local.private_subnets

  vpc_id                  = data.aws_vpc.default.id
  cidr_block              = each.value.cidr
  availability_zone       = each.value.az
  map_public_ip_on_launch = false
  tags = {
    Name    = "monarchy-private-${each.key}"
    Project = "monarchy1"
    Purpose = "private-database"
  }
}

resource "aws_route_table" "private" {
  vpc_id = data.aws_vpc.default.id
  tags = {
    Name    = "monarchy-private"
    Project = "monarchy1"
  }
}

resource "aws_route_table_association" "private" {
  for_each       = local.private_subnets
  subnet_id      = aws_subnet.private[each.key].id
  route_table_id = aws_route_table.private.id
}

resource "aws_db_subnet_group" "aurora_private" {
  name       = "monarchy-private"
  subnet_ids = [for subnet in aws_subnet.private : subnet.id]
  tags = {
    Name    = "monarchy-private"
    Project = "monarchy1"
  }
}

resource "aws_db_subnet_group" "aurora_existing" {
  name        = "monarchy-prod"
  subnet_ids  = ["subnet-a0866ec6", "subnet-b507f2ea", "subnet-834ef6ce"]
  description = "Databases for monarchy prod"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_rds_cluster" "prod" {
  cluster_identifier           = "monarchy-prod"
  engine                       = "aurora-postgresql"
  engine_version               = "16.11"
  database_name                = "monarchy"
  db_subnet_group_name         = aws_db_subnet_group.aurora_existing.name
  backup_retention_period      = 7
  deletion_protection          = true
  copy_tags_to_snapshot        = true
  storage_encrypted            = true
  performance_insights_enabled = true
  kms_key_id                   = "arn:aws:kms:us-east-1:930597685973:key/4bb9ab64-5869-44c2-a153-e111666a7cee"
  vpc_security_group_ids       = ["sg-6f559340"]
  master_username              = "root"
  skip_final_snapshot          = true
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [master_password]
  }
}

resource "aws_rds_cluster_instance" "prod" {
  identifier          = "monarchy-prod-instance-1"
  cluster_identifier  = aws_rds_cluster.prod.id
  instance_class      = "db.serverless"
  engine              = "aurora-postgresql"
  engine_version      = "16.11"
  publicly_accessible = true
  promotion_tier      = 1
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_ecr_repository" "api" {
  name                 = "monarchy-api"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration { scan_on_push = false }
  encryption_configuration { encryption_type = "AES256" }
  force_delete = false
  lifecycle {
    prevent_destroy = true
  }
}
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["al2023-ami-202*-x86_64"]
  }
  filter {
    name   = "state"
    values = ["available"]
  }
}

data "aws_route53_zone" "monarchy" {
  name         = "monarchy1.com."
  private_zone = false
}
resource "aws_security_group" "api" {
  name        = "monarchy-api"
  description = "Public HTTP and HTTPS access for the Monarchy API"
  vpc_id      = data.aws_vpc.default.id
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    description = "Outbound internet access"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = { Name = "monarchy-api", Project = "monarchy1" }
}
resource "aws_iam_role" "ec2" {
  name               = "monarchy-api-ec2"
  assume_role_policy = jsonencode({ Version = "2012-10-17", Statement = [{ Effect = "Allow", Principal = { Service = "ec2.amazonaws.com" }, Action = "sts:AssumeRole" }] })
}
resource "aws_iam_role_policy_attachment" "ssm" {
  role       = aws_iam_role.ec2.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}
resource "aws_iam_role_policy" "ecr_read" {
  name   = "ecr-read"
  role   = aws_iam_role.ec2.id
  policy = jsonencode({ Version = "2012-10-17", Statement = [{ Effect = "Allow", Action = ["ecr:GetAuthorizationToken", "ecr:BatchCheckLayerAvailability", "ecr:GetDownloadUrlForLayer", "ecr:BatchGetImage"], Resource = "*" }] })
}
resource "aws_iam_instance_profile" "ec2" {
  name = "monarchy-api-ec2"
  role = aws_iam_role.ec2.name
}
resource "aws_instance" "api" {
  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = var.instance_type
  subnet_id                   = data.aws_subnets.public.ids[0]
  vpc_security_group_ids      = [aws_security_group.api.id]
  iam_instance_profile        = aws_iam_instance_profile.ec2.name
  associate_public_ip_address = true
  key_name                    = var.ssh_key_name != "" ? var.ssh_key_name : null
  user_data = templatefile("${path.module}/user-data.sh.tftpl", {
    aws_region  = var.aws_region
    image       = "930597685973.dkr.ecr.us-east-1.amazonaws.com/monarchy-api:latest"
    kms_key_arn = aws_kms_key.secrets.arn
  })
  metadata_options {
    http_tokens = "required"
  }
  tags = { Name = "monarchy-api", Project = "monarchy1" }
}

resource "aws_eip" "api" {
  domain = "vpc"
  tags = {
    Name    = "monarchy-api"
    Project = "monarchy1"
  }
}

resource "aws_eip_association" "api" {
  instance_id   = aws_instance.api.id
  allocation_id = aws_eip.api.id
}

resource "aws_route53_record" "api" {
  zone_id         = data.aws_route53_zone.monarchy.zone_id
  name            = "api.monarchy1.com"
  type            = "A"
  ttl             = 60
  records         = [aws_eip.api.public_ip]
  allow_overwrite = true
}
