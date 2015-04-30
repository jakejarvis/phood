module.exports = {
	 
	execute: function(app) {
		app.post('/sendSMS', function(req, res) {
			var accountSid = 'AC030beb99079233764567be1d99b5e372';
			var authToken = "5d08bb7f44240cabd1b96a73f6f30f1b";
			var client = require('twilio')(accountSid, authToken);


			var phonenumber = req.body.phonenumber;
			var name = req.body.name;
			var address = req.body.address;


			var text = name + " is at " + address;

			// message will have the restaurant's name, a photo of from the restaurant, and a link to its page
			client.sms.messages.create({
			    body: text,
		//	    MediaUrl: "http://gph.is/YCpEbw",
			    to: phonenumber,
			    from: "+12817466310"
			}, function(err, sms) {
			    	process.stdout.write(sms.sid);
			});

			console.log("response");
			res.status(204);
	    	res.send();

		})
	}
};