module.exports = {
    execute: function(app, http) {
        // restaurant page 
        app.get('/restaurant/:id?/:nothing?', function(req, res) {

            if(req.query.id) {
                res.redirect('/restaurant/' + req.query.id);    // redirect old URL (/restaurant?id=xxxx) to new URL (/restaurant/xxxx)
            } else {

                foursquareid = req.query.id || req.params.id; // get id parameter from url (/restaurant?id=xxxxxxx)

                var options = {
                    host: 'api.instagram.com',
                    path: '/v1/locations/search?foursquare_v2_id=' + foursquareid + '&access_token=1825654502.22880a8.088578a5f9a34067ad37caf165e0ba03'
                };

                callback = function(response) {
                    var str = '';

                    //another chunk of data has been recieved, so append it to `str`
                    response.on('data', function(chunk) {
                       str += chunk;
                    });

                    //the whole response has been recieved, so we just print it out here
                    response.on('end', function() {
                        var jsonString = JSON.stringify(eval("(" + str + ")"));
                        var jsonData = JSON.parse(jsonString);

                        if(jsonData.data.length) {

                            var id = jsonData.data[0].id;

                            var instaOptions = {
                                host: 'api.instagram.com',
                                path: '/v1/locations/' + id + '/media/recent?access_token=1825654502.22880a8.088578a5f9a34067ad37caf165e0ba03&count=500'
                            };

                            instaCallback = function(response) {

                                var instastr = '';

                                //another chunk of data has been recieved, so append it to `str`
                                response.on('data', function (chunk) {
                                    instastr += chunk;
                                });

                                //the whole response has been recieved, so we just print it out here
                                response.on('end', function () {
                                    var instaString = JSON.stringify(eval("(" + instastr + ")"));
                                    var instaData = JSON.parse(instaString);

                                    images = [];

                                    for (var i = 0; i < instaData.data.length; i++) {
                                        if (instaData.data[i].type == "image") {
                                            var imageURL = instaData.data[i].images.standard_resolution.url;

                                            images.push(imageURL);
                                        }
                                    }


                                    var foursquareOptions = {
                                        host: 'api.foursquare.com',
                                        path: '/v2/venues/' + foursquareid + '?client_id=AHETXZDGE5YWYLLM5AR13UTWC3UXETSPE54UHAOVRNPJLXIT&client_secret=SCLHL3DIHUSWIBWALLQE3TDHMEZUPCPVRV55FEN0WJRBJPU2&v=20150426'
                                    };

                                    foursquareCallback = function(response) {
                                        var str = '';

                                        //another chunk of data has been recieved, so append it to `str`
                                        response.on('data', function(chunk) {
                                           str += chunk;
                                        });

                                        //the whole response has been recieved, so we just print it out here
                                        response.on('end', function () {

                                            var foursquareString = JSON.stringify(eval("(" + str + ")"));
                                            var foursquareData = JSON.parse(foursquareString);

                                            address = "";

                                            name = foursquareData.response.venue.name;
                                            url = foursquareData.response.venue.url;

                                            for(var i = 0; i < foursquareData.response.venue.location.formattedAddress.length; i++) {
                                                address += foursquareData.response.venue.location.formattedAddress[i] + "\n";
                                            }

                                            res.render('pages/restaurant', {
                                                title: name,
                                                name: name,
                                                id: id,
                                                address: address,
                                                url: url,
                                                images: images
                                            });
                                            

                                        });

                                    }

                                    http.request(foursquareOptions, foursquareCallback).end();

                                });
                            }

                            http.request(instaOptions, instaCallback).end();

                        } else {

                            res.render('pages/nophotos');

                        }
                    });
                }

                http.request(options, callback).end();

            }

        });

    }
}