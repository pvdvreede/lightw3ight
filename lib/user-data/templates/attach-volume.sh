echo ""
aws ec2 attach-volume \
  --instance-id $INSTANCE_ID \
  --volume-id ${VolumeLogicalName} \
  --device ${device} \
  --region $AWS_REGION

sleep 2

{
  lsblk -f ${device} | grep ext4
  echo ""
} || mkfs.ext4 ${device}
