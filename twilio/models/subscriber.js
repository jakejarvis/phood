// Twilio subscriber
// Subscriber.js

var SubscriberSchema = new mongoos.Schema({
        phone: String,
        subscribed: {
                type: Boolean,
                default: false
        }
});
