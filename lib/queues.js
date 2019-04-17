const aws = require('aws-sdk');

aws.config.update({
  region: 'us-west-2',
  accessKeyId: "foo",
  secretAccessKey: "bar",
  endpoint: "http://localhost:4576/",
  logger: process.stdout
});

var sqs = new aws.SQS();

function list() {
  sqs.listQueues({}, return_function);
}

function getQueueInformation(queue) {
  params = {
    QueueUrl: queue_url(queue),
    AttributeNames: ["QueueArn"]
  }
  sqs.getQueueAttributes(params, return_function)
}

function create(name) {
  if (name === undefined) throw "A name must be given"

  var params = {
    QueueName: name
  };

  sqs.createQueue(params, return_function);
}

function send(queue, message) {
  if (queue === undefined) throw "A queue must be given"
  if (message === undefined) throw "A message must be given"

  params = {
    MessageBody: message,
    QueueUrl: queue_url(queue),
  }

  sqs.sendMessage(params, return_function)
}


function purge(queue) {

  var params = {
    QueueUrl: queue_url(queue),
  };

  sqs.purgeQueue(params, return_function)
}


function receive(queue) {
  if (queue === undefined) throw "A queue must be given"
  var params = {
    QueueUrl: queue_url(queue)
  };

  sqs.receiveMessage(params, return_function)
}

function queue_url(queue_name) {
  return "http://localhost:4576/queue/" + queue_name
}

function return_function(err, data) {
  console.log(err ? err : data)
}

switch (process.argv[2]) {
  case "get":
    getQueueInformation(process.argv[3])
    break;
  case "purge":
    purge(process.argv[3])
    break;
  case "receive":
    receive(process.argv[3])
    break;
  case "send":
    send(process.argv[3], process.argv[4])
    break;
  case "create":
    create(process.argv[3])
    break;
  case "list":
    list()
    break;
}
