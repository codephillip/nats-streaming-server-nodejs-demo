import nats, {Message} from "node-nats-streaming";
import {randomBytes} from "crypto";
import {Subjects} from "../templates/subjects";
import {QueueGroupNames} from "../templates/queue-group-names";
import {natsWrapper} from "../templates/nats-wrapper";
import { SmsNotificationCreatedListener } from "./smsnotification-created-listener";

console.clear();

// must be unique
const clientId = randomBytes(4).toString('hex');

const start= async () =>{
    await natsWrapper.connectNatsListener('ticketing', randomBytes(4).toString('hex'), 'http://localhost:4222')

    new SmsNotificationCreatedListener(natsWrapper.client).listen();
}

start();