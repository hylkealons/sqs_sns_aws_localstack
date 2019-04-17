# SQS/SNS Spike project

The idea of this project is experimenting with the functionality of Amazon SQS/SNS. Localstack was
used for testing locally.

## Setting up the project

Install localstack

```bash
pip install virtualenv # Installs virtual env
pip install localstack # Installs localstack inside the virtual env


Start the localstack within the virtual env

source .venv/bin/activate # Activates virtualenv
export SERVICES=sqs,sns # Start only sqs and sns
localstack start
```

## Usage

When everything is set up well,  SQS is running on port 4576 and SNS on port 4575.

Supported functions for SNS:

- subscribe
- publish
- create
- list

Supported functions for SQS:

- get
- purge
- receive
- send
- create
- list

Basic usage:

```bash
# Create a queue named mytestqueue
node lib/queues.js create mytestqueue

# Ensure its created
node lib/queues.js list

# Let's create an SNS topic
node lib/topics.js create mytesttopic

# Connect the queue to the sns topic
node lib/topics.js subscribe mytesttopic mytestqueue

# Send a message to the topic
node lib/topics.js publish mytesttopic "mytestmessage"

# Ensure the queue received it
node lib/queues.js receive mytesttopic
```
