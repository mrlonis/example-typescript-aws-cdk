#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { ExampleTypescriptAwsCdkStack } from '../lib/example-typescript-aws-cdk-stack';

const app = new cdk.App();
new ExampleTypescriptAwsCdkStack(app, 'ExampleTypescriptAwsCdkStack');
