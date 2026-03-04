vpcname = portfoliovpc
cidr = "10.0.0.0/16"
az = ["us-east-1a","us-east-1b"]
public_subnet_cidr = ["10.0.1.0/24","10.0.2.0/24"]
private_subnet_cidr = ["10.0.3.0/24","10.0.4.0/24"]
sgname = portfolioalbsg
clustername = portfolio_cluster
node_instance_type = t3.medium