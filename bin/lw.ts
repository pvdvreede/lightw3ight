#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { MasterStack } from '../lib/master-stack';
import { VpcStack } from '../lib/vpc-stack';

const app = new cdk.App();
const vpcStack = new VpcStack(app, 'VpcStack')
new MasterStack(app, 'MasterStack', {vpc: vpcStack.vpc});
