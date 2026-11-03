output "instance_id" { value = aws_instance.api.id }
output "public_ip" { value = aws_instance.api.public_ip }
output "elastic_ip" { value = aws_eip.api.public_ip }
output "security_group_id" { value = aws_security_group.api.id }
output "private_db_subnet_group" { value = aws_db_subnet_group.aurora_private.name }
output "secrets_kms_key_arn" { value = aws_kms_key.secrets.arn }
