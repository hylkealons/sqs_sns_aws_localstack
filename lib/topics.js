const aws = require('aws-sdk');

aws.config.update({
  region: 'us-west-2',
  accessKeyId: "foo",
  secretAccessKey: "bar",
  endpoint: "http://localhost:4575",
  logger: process.stdout
});

var sns = new aws.SNS();

function list() {
  sns.listTopics({}, return_function);
}

function create(name) {
  if (name === undefined) throw "A name must be given"

  var params = {
    Name: name
  };

  sns.createTopic(params, return_function);
}

//$ aws --endpoint-url=http://localhost:4575 sns subscribe --topic-arn arn:aws:sns:us-east-1:123456789012:my_topic --protocol sqs --notification-endpoint arn:aws:sns:us-east-1:123456789012:my_queue

function subscribe(topic, queue) {
  if (topic === undefined) throw "A topic must be given"

  params = {
    Protocol: 'sqs',
    TopicArn: "arn:aws:sns:us-west-2:123456789012:" + topic,
    Endpoint: 'arn:aws:sqs:elasticmq:000000000000:' + queue,
  };

  sns.subscribe(params, return_function)
}

function publish(topic, message) {
  if (topic === undefined) throw "A topic must be given"
  if (message === undefined) throw "A message must be given"

  params = {
    Message: message,
    TopicArn: "arn:aws:sns:us-west-2:123456789012:" + topic,
    // MessageStructure: "json"
  };
  console.log(params)

  sns.publish(params, return_function)
}

function return_function(err, data) {
  console.log(err ? err : data)
}

switch (process.argv[2]) {
  case "subscribe":
    subscribe(process.argv[3], process.argv[4])
    break;
  case "publish":
    publish(process.argv[3], process.argv[4])
    break;
  case "create":
    create(process.argv[3])
    break;
  case "list":
    list()
    break;
}
