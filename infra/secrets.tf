resource "aws_kms_key" "secrets" {
  description             = "Monarchy runtime secrets"
  enable_key_rotation     = true
  deletion_window_in_days = 30
  tags = {
    Name    = "monarchy-secrets"
    Project = "monarchy1"
  }
}

resource "aws_kms_alias" "secrets" {
  name          = "alias/monarchy-secrets"
  target_key_id = aws_kms_key.secrets.key_id
}

resource "aws_iam_role_policy" "secrets_decrypt" {
  name = "secrets-decrypt"
  role = aws_iam_role.ec2.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["kms:Decrypt"]
      Resource = aws_kms_key.secrets.arn
    }]
  })
}
