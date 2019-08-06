function cleanup {
  last_exit=$?
  /opt/aws/bin/cfn-signal \
    --exit-code $last_exit \
    --region \${AWS::Region} \
    --resource ${asgLogicalName} \
    --stack \${AWS::StackName}
}

trap cleanup EXIT
