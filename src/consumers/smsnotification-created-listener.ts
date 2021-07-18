import {Message} from 'node-nats-streaming';
import {queueGroupNames} from '../templates/queue-group-name';
import {Listener} from "../templates/base-listener";
import {SmsNotificationCreatedEvent} from "../templates/smsnotification-created-event";
import {Subjects} from "../templates/subjects";

export class SmsNotificationCreatedListener extends Listener<SmsNotificationCreatedEvent> {
    readonly subject = Subjects.SmsNotificationCreated;
    queueGroupName = queueGroupNames;

    async onMessage(data: SmsNotificationCreatedEvent['data'], msg: Message) {
        const {message, phoneNumbers} = data;

        // const smsModel = SmsModel.build({
        //     message,
        //     phoneNumbers,
        // });
        // await smsModel.save();
        console.log(msg.getSequence())
        console.log(message)
        console.log(phoneNumbers)

        msg.ack();
    }
}
