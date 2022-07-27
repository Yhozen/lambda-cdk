import { Stack, StackProps, Aws } from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {
  aws_s3 as s3,
  aws_ecr as ecr,
  aws_lambda as lambda,
} from "aws-cdk-lib";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
const path = require("node:path");
import * as ecrdeploy from "cdk-ecr-deployment";

export class LambdaCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new ecr.Repository(this, "Repository");

    const image = new DockerImageAsset(this, "MyBuildImage", {
      directory: path.join(__dirname, "my-image"),
    });

    // Copy from cdk docker image asset to another ECR.
    new ecrdeploy.ECRDeployment(this, "DeployDockerImage1", {
      src: new ecrdeploy.DockerImageName(image.imageUri),
      dest: new ecrdeploy.DockerImageName(repository.repositoryUri),
    });

    new lambda.DockerImageFunction(this, "AssetFunction", {
      code: lambda.DockerImageCode.fromEcr(repository),
    });

    new lambda.DockerImageFunction(this, "OtherFunction", {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(__dirname, "my-image")
      ),
    });
    new s3.Bucket(this, "CDKBucket", {
      versioned: true,
    });
  }
}
