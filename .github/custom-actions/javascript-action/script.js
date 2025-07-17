const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

const run = () => {
    core.notice('welcome to javascript custom action')
    exec.exec('echo', ['Deploying static web to S3'])
    //Get the inputs from the action call
    const bucketName= core.getInput('S3-BUCKET-NAME');
    const bucketRegion= core.getInput('S3-BUCKT-REGION');
    const buildPath= core.getInput('BUILD-LOCATION');
    //Connect with S3 and upload build files - aws command
    const s3Uri = `s3://${bucketName}`
    exec.exec(`aws s3 sync ${buildPath} ${s3Uri} --region ${bucketRegion}`)
    exec.exec('echo', ['Uploaded build files to S3'])
    //To return the output from the action
    const hostedUrl = `http://${bucketName}.s3-website.${bucketRegion}.amazonaws.com`;
    core.setOutput('hosted-url', hostedUrl);
};

run();