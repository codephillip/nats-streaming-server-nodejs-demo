import nats from "node-nats-streaming";
import {randomBytes} from "crypto";
import {Subjects} from "./subjects";


console.clear();

// Connect to a nats-server and return the client
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
})

// watch for 'connect' event
stan.on('connect', () => {
    console.log('Publisher connected :)');

    // must be converted to json
    const data = JSON.stringify({
        id: '123',
        message: 'Remember to use the app',
        phoneNumbers: ['+256756878460']
    });

    stan.publish(Subjects.SmsNotificationCreated, data, () => {
        console.log('event published :)');
    });

})