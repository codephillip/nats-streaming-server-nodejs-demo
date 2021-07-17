import nats, {Message} from "node-nats-streaming";
import {randomBytes} from "crypto";
import {Subjects} from "./subjects";

console.clear();

// @ts-ignore
// must be unique
const clientId = randomBytes(4).toString('hex');

const stan = nats.connect('ticketing', clientId, {
    url: 'http://localhost:4222'
});

// listen for when NATS connect signal
stan.on('connect', () => {
    console.log('Listener connected to NATS');

    const options = stan.subscriptionOptions()
        // allows manual trigger after processing is done
        .setManualAckMode(true)
        // returns all events from inception. However, coupled with setDurableName, this will trigger once
        .setDeliverAllAvailable()
        // usually same name as (k8s) service name. to test this
        .setDurableName("foobar-service-listener");

    // add a queue group to prevent duplicate processing. queuegroup + setDurableName + setDeliverAllAvailable,
    // prevents NATS from resetting memory about previous events
    // https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19124592#notes
    const sub = stan.subscribe(Subjects.SmsNotificationCreated, 'listenerQueueGroup', options);

    // message = event, msg = object of data
    // annotate msg with Message
    sub.on('message', (msg: Message) => {
        // ${JSON.parse(msg.getData())
        // @ts-ignore
        console.log(`Received event # ${msg.getSequence()} with ${msg.getData()} data`);
        // trigger on process finished
        msg.ack();
    });

});

// listen for when NATS close signal
stan.on('close', ()=>{
    console.log('NATS connection closed');
    process.exit()
})

// incase of system process interraption, close NATS connection inorder to avoid situations
// where events are sent to dead clients
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());