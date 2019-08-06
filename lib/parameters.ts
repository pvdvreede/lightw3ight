import cdk = require('@aws-cdk/core');

interface K3SParametersProps extends cdk.StackProps {
  clusterName: string
}

export class K3SParameters extends cdk.Construct {
  private readonly props: K3SParametersProps;

  constructor(scope: cdk.Construct, id: string, props: K3SParametersProps) {
    super(scope, id);
    this.props = props;
  }

  protected prepare() {
    throw "hit the prepare";
  }
}
