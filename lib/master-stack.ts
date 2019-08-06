import cdk = require('@aws-cdk/core');
import asg = require('@aws-cdk/aws-autoscaling');
import ec2 = require('@aws-cdk/aws-ec2');
import { Vpc } from '@aws-cdk/aws-ec2';
import { masterUserData } from './master-user-data';

interface MasterProps extends cdk.StackProps {
  vpc: ec2.Vpc
}

export class MasterStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: MasterProps) {
    super(scope, id, props);

    new asg.AutoScalingGroup(this, 'MasterASG', {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
      userData: masterUserData('test1'),
    });
  }
}
