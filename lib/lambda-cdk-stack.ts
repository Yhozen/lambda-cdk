import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  aws_lambda as lambda,
  aws_events_targets as targets,
} from "aws-cdk-lib";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";

const path = require("node:path");

export class LambdaCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.DockerImageFunction(
      this,
      "LfUpdaterFunction",
      {
        code: lambda.DockerImageCode.fromImageAsset(
          path.join(__dirname, "lf-updater")
        ),
        timeout: Duration.minutes(10),
      }
    );

    new Rule(this, "weeklyRule", {
      schedule: Schedule.rate(Duration.days(7)),
      targets: [new targets.LambdaFunction(lambdaFunction)],
    });
  }
}
