variable "vpcname" {
    type = string
}

variable "cidr"{
    type = string
}

variable "az" {
    type = list(string)
}

variable "public_subnet_cidr" {
    type = list(string)
}

variable "private_subnet_cidr" {
    type = list(string)
}

variable "sgname" {
    type = string
}

variable "clustername" {
    type = string
}

variable "node_instance_type" {
    type = string
}