module.exports = {
	 
	execute: function(app) {
		app.post('/sendSMS', function(req, res) {
			var accountSid = process.env.TWILIO_ID;
			var authToken = process.env.TWILIO_SECRET;
			var client = require('twilio')(accountSid, authToken);


			var phonenumber = req.body.phonenumber;
			var name = req.body.name;
			var address = req.body.address;

			if(phonenumber == undefined) {

			}

			var text = name + " is at " + address;

			// message will have the restaurant's name, a photo of from the restaurant, and a link to its page
			client.sms.messages.create({
			    body: text,
		//	    MediaUrl: "http://gph.is/YCpEbw",
			    to: phonenumber,
			    from: "+12817466310"
			}, function(err, sms) {
				if(err) {
					console.log("Something went wrong with Twilio:");
					console.log(err);
				} else {
					res.status(205);
					res.send();
				}
			});
			
			
		})
	}
};