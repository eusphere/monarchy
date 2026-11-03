variable "aws_region" {
  type    = string
  default = "us-east-1"
}
variable "instance_type" {
  type    = string
  default = "t3.micro"
}
variable "ssh_key_name" {
  type    = string
  default = ""
}
