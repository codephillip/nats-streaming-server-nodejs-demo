import {Subjects} from './subjects';

export interface SmsNotificationCreatedEvent {
    subject: Subjects.SmsNotificationCreated;
    data: {
        phoneNumbers: Array<string>;
        message: string;
    };
}
