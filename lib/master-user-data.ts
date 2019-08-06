import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

interface MasterUserDataProps extends cdk.StackProps {
  clusterName: string
}

export function masterUserData(clusterName: string): ec2.UserData {
  return new UserDataBuilder().build()
}

const signalFn = `
function cleanup {
  last_exit=$?
  /opt/aws/bin/cfn-signal \
    --exit-code $last_exit \
    --region \${AWS::Region} \
    --resource xxx \
    --stack \${ AWS::StackName }
}

trap cleanup EXIT
`;

class UserDataBuilder {
  private ud: ec2.UserData;
  private k3sVersion: string;

  constructor() {
    this.ud = ec2.UserData.forLinux();

    this.ud.addCommands("set -e");
    this.ud.addCommands("exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1");
    this.ud.addCommands(signalFn);
  }

  public withK3SVersion(v: string): UserDataBuilder {
    this.k3sVersion = v;
    return this;
  }

  public attachVolume(volId: string, device: string): UserDataBuilder {
    return this;
  }

  public build(): ec2.UserData {

    return this.ud;
  }
}
