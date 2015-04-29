module.exports = {
    execute: function(app) {
        // restaurant page 
        app.get('/restaurant', function(req, res) {
            id = req.query.id; // get id parameter from url (/restaurant?id=xxxxxxx)
            name = req.query.name;
  			// get restuarant name from foursquare
		    /*
		    $.getJSON('https://api.foursquare.com/v2/venues/' + id + '?client_id=AHETXZDGE5YWYLLM5AR13UTWC3UXETSPE54UHAOVRNPJLXIT&client_secret=SCLHL3DIHUSWIBWALLQE3TDHMEZUPCPVRV55FEN0WJRBJPU2&v=20150426', {}, function(data) {
		            name = data.response.venue.name;
		            console.log(name);
		    });
*/
/*
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: 'https://api.instagram.com/v1/locations/search?foursquare_v2_id=' + id + '&access_token=1825654502.22880a8.088578a5f9a34067ad37caf165e0ba03',
            success: function(data) {
                instaid = data.data[0].id;
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    cache: false,
                    url: 'https://api.instagram.com/v1/locations/' + instaid + '/media/recent?access_token=1825654502.22880a8.088578a5f9a34067ad37caf165e0ba03',
                    success: function(data) {
                        for (var i = 0; i < data["data"].length; i++) {
                            if (data.data[i].type == "image") {
                                $("#food").append("<a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url + "'></img></a>");
                            }
                        }
                    }
                });
            }
        });


*/



            res.render('pages/restaurant', {
                name: name,
                id: id
            });
        });

    }
}