import {Message} from 'node-nats-streaming';
import {Listener} from "../templates/base-listener";
import {SmsNotificationCreatedEvent} from "../templates/smsnotification-created-event";
import {Subjects} from "../templates/subjects";
import {QueueGroupNames} from "../templates/queue-group-names";

export class SmsNotificationCreatedListener extends Listener<SmsNotificationCreatedEvent> {
    readonly subject = Subjects.SmsNotificationCreated;
    readonly queueGroupName = QueueGroupNames.SmsService;

    async onMessage(data: SmsNotificationCreatedEvent['data'], msg: Message) {
        const {message, phoneNumbers} = data;
        console.log(msg.getSequence())
        console.log(message)
        console.log(phoneNumbers)

        msg.ack();
    }
}
