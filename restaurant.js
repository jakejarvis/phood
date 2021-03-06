module.exports = {
    execute: function(app, http) {
        // restaurant page 
        app.get('/restaurant/:id?/:name?', function(req, res) {

            if(req.query.id) {
                res.redirect('/restaurant/' + req.query.id);    // redirect old URL (/restaurant?id=xxxx) to new URL (/restaurant/xxxx)
            } else {

                foursquareid = req.params.id; // get id parameter from url (/restaurant?id=xxxxxxx)

                var options = {
                    host: 'api.instagram.com',
                    path: '/v1/locations/search?foursquare_v2_id=' + foursquareid + '&access_token=' + process.env.INSTAGRAM_SECRET
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

                        if(typeof(jsonData.data) != "undefined" && jsonData.data.length) {

                            var id = jsonData.data[0].id;

                            var instaOptions = {
                                host: 'api.instagram.com',
                                path: '/v1/locations/' + id + '/media/recent?access_token=' + process.env.INSTAGRAM_SECRET + '&count=500'
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
                                            var instaPhoto = [];

                                            if(instaData.data[i].caption)
                                                instaPhoto['caption'] = instaData.data[i].caption.text;
                                            instaPhoto['imageURL'] = instaData.data[i].images.standard_resolution.url;
                                            instaPhoto['link'] = instaData.data[i].link;
                                            instaPhoto['username'] = instaData.data[i].user.username;
                                            instaPhoto['time'] = instaData.data[i].created_time;

                                            images.push(instaPhoto);
                                        }
                                    }


                                    var foursquareOptions = {
                                        host: 'api.foursquare.com',
                                        path: '/v2/venues/' + foursquareid + '?client_id=' + process.env.FOURSQUARE_ID + '&client_secret=' + process.env.FOURSQUARE_SECRET + '&v=20150426'
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

                                            foursquare_id = req.params.id;
                                            foursquare_image = foursquareData.response.venue.bestPhoto.prefix + '640x640' + foursquareData.response.venue.bestPhoto.suffix;
//console.log(foursquareData.response.venue.menu.url);
                                            foursquare_menu = null;
                                            if(foursquareData.response.venue.hasMenu)
                                                foursquare_menu = foursquareData.response.venue.menu.url;

                                            for(var i = 0; i < foursquareData.response.venue.location.formattedAddress.length; i++) {
                                                address += foursquareData.response.venue.location.formattedAddress[i] + "\n";
                                            }

                                            res.render('pages/restaurant', {
                                                title: name,
                                                name: name,
                                                id: id,
                                                foursquare_id: foursquare_id,
                                                foursquare_image: foursquare_image,
                                                foursquare_menu: foursquare_menu,
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


        function slugify(name) {
            return name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
        }
    }
}
