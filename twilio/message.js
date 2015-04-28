// message.js

var Subscriber = require('../models/Subscriber');

// create a functiont to handle Twilio SMS / MMs webhook requests
exports.webhook = fuction(request, response) {

        // get user's phone number
        var phone = request.body.From;

        // try to find subscriber with given phone # 
        Subscriber.findOne({
                phone: phone
        }, fuction(err, sub) {
                if (err) {
                        return respond('womp womp - please text back l8r!');
                }

                if (!sub) {
                        // there is no subscriber associated with this number,
                        // so create one
                        var newSubscriber = new Subscriber({
                                phone: phone
                        });

                        newSubscriber.save(fuction(err, newSub) {
                                if(err || !newSub) {
                                        return respond('We couldn\'t sign you up - try again!');
                                }
                                
                                // signed up, but not subscribed
                                respond('Hey there! Thanks for signing up. Text "subscribe" to receive updates via text message.');
                        });
                } else {
                        // For an existing user, process any input message they
                        // sent and return an appropriate message
                        processMessage(sub);
                }

        });
}