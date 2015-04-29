module.exports = {
    execute: function(app) {
        // restaurant page 
        app.get('/restaurant', function(req, res) {
            var id = req.param('id'); // get id parameter from url (/restaurant?id=xxxxxxx)
            var restaurant_name = req.param('name');
            res.render('pages/restaurant', {name: restaurant_name, id: id});
        });
    }
}
