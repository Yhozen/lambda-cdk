import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { aws_lambda as lambda } from "aws-cdk-lib";
const path = require("node:path");

export class LambdaCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new lambda.DockerImageFunction(this, "OtherFunction", {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(__dirname, "my-image")
      ),
    });
  }
}
