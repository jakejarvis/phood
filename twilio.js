module.exports = {
	var accountSid = 'AC030beb99079233764567be1d99b5e372';
	var authToken = "5d08bb7f44240cabd1b96a73f6f30f1b";
	var client = require('twilio')(accountSid, authToken);
	 
	execute: function(app) {
		app.post('/sendSMS', function(req, res) {
			// message will have the restaurant's name, a photo of from the restaurant, and a link to its page
			client.sms.messages.create({
			    body: "Jenny please?! Gimme another chance! I CAN DO BETTER",
			    MediaUrl: "http://gph.is/YCpEbw",
			    to: "+15026459166",
			    from: "+12817466310"
			}, function(err, sms) {
			    process.stdout.write(sms.sid);
			});
		})
	}
};