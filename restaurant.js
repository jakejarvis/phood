module.exports = {
    execute: function(app) {
        // restaurant page 
        app.get('/restaurant', function(req, res) {
            var id = req.param('id'); // get id parameter from url (/restaurant?id=xxxxxxx)

            res.render('pages/restaurant', {name: "Chipotle", id: id});
        });
    }
}
