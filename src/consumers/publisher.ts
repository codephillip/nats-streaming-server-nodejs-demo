import {randomBytes} from "crypto";
import {Subjects} from "../templates/subjects";
import {natsWrapper} from "../templates/nats-wrapper";
import {SmsNotificationCreatedPublisher} from "./smsnotification-created-publisher";


const start = async () => {
    console.clear();

    await natsWrapper.connectNatsListener('ticketing', randomBytes(4).toString('hex'), 'http://localhost:4222')

    const publisher = new SmsNotificationCreatedPublisher(natsWrapper.client);
    await publisher.publish({
        message: 'Remember to use the app',
        phoneNumbers: ['+256756878460']
    })
}

start();