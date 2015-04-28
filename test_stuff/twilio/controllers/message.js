// message.js

var Subscriber = require('../models/Subscriber');

// create a function to handle Twilio SMS / MMs webhook requests
exports.webhook = function(request, response) {

    // get user's phone number
    var phone = request.body.From;

    // try to find subscriber with given phone # 
    Subscriber.findOne({
            phone: phone
    }, function(err, sub) {
        if (err) {
            return respond('womp womp - please text back l8r!');
        }

        if (!sub) {
            // there is no subscriber associated with this number,
            // so create one
            var newSubscriber = new Subscriber({
                    phone: phone
            });

            newSubscriber.save(function(err, newSub) {
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

    // process any message the user sent to us
    function processMessage(subscriber) {
        // get the text message command sent by the user
        var msg = request.body.Body || '';
        msg = msg.toLowerCase().trim();

        // Conditional logic to do different things based on the user's command
        if (msg === 'subscribe' || msg === 'unsubscribe') {
            subscriber.subscribed = msg === 'subscribe';
            subscriber.save(function(err) {
                if(err) {
                    return respond('We could not subscribe you :c - please try '
                        +'again.');
                }

                // subscription is updated!
                var responseMessage = 'You are now subscribed for updates.';

                if (!subscriber.subscribed) {
                    responseMessage = 'We\'re sad to see you go. If you want to'
                    + ' receive updates in the future, text "subscribe"!';
                }

                respond(responseMessage);
            });
        } else {
            // command not recognized
            var responseMessage = 'Sorry we didn\'t understand that.' +
            'Available comands are: subscribe or unsubscribe';
            respond(responseMessage);
        }
    }

    function respond(message) {
        response.type('text/xml');
        response.render('twiml', {
            message: message
        });
    }

}

// Handle form submission
exports.sendMessages = function(request, response) {
    // Get message info from form submission
    var message = request.body.message;
    var imageUrl = request.body.imageUrl;

    // Use model function to send messages to all subscribers
    Subscriber.sendMessage(message, imageUrl, function(err) {
        if (err) {
            request.flash('errors', err.message);
        } else {
            request.flash('successes', 'Messages on their way!');
        }

        response.redirect('/');
    });
};