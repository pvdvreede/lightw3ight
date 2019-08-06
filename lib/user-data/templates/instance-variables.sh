export INSTANCE_ID="$(curl http://169.254.169.254/latest/meta-data/instance-id)"
export AWS_REGION="\${AWS::Region}"
