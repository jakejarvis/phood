module.exports = {
    execute: function(app, http) {





        // restaurant page 
        app.get('/restaurant', function(req, res) {



            id = req.query.id; // get id parameter from url (/restaurant?id=xxxxxxx)
            name = req.query.name;

            var options = {
                host: 'api.instagram.com',
                path: '/v1/locations/search?foursquare_v2_id=' + id + '&access_token=1825654502.22880a8.088578a5f9a34067ad37caf165e0ba03'
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
                    var id = jsonData.data[0].id;



                    var instaOptions = {
                        host: 'api.instagram.com',
                        path: '/v1/locations/' + id + '/media/recent?access_token=1825654502.22880a8.088578a5f9a34067ad37caf165e0ba03'
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




                            console.log(images);




                            res.render('pages/restaurant', {
                                name: name,
                                id: id,
                                images: images
                            });

                        });
                    }



                    http.request(instaOptions, instaCallback).end();
                });
            }


            http.request(options, callback).end();

        });

    }
}