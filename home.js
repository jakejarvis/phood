module.exports = {
    execute: function(app) {
        // homepage 
        app.get('/', function(req, res) {
            res.render('pages/index');
        });
    }
}

