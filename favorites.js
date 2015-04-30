module.exports = {
    execute: function(app) {
        // homepage 
        app.get('/favorites', function(req, res) {
            res.render('pages/favorites', {title: "Favorites"});
        });
    }
}

