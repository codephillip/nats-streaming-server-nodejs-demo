import {Publisher} from "../templates/base-publisher";
import {SmsNotificationCreatedEvent} from "../templates/smsnotification-created-event";
import {Subjects} from "../templates/subjects";


export class SmsNotificationCreatedPublisher extends Publisher<SmsNotificationCreatedEvent> {
    readonly subject = Subjects.SmsNotificationCreated;
}
