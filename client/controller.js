function configure(app){
    const getPage = function(req, res) {
        res.sendFile(`${__dirname}/pages/${req.params.page}.html`);
    }
    
    app.get('/', function(req, res, next) {
        req.params.page = '/index';
        next();
    }, getPage);

    app.get('/pages/:page', getPage);
    
    app.get('/scripts/:script', function(req, res) {
        res.sendFile(`${__dirname}/scripts/${req.params.script}`);
    });
    
    app.get('/styles/:style', function(req, res) {
        res.sendFile(`${__dirname}/styles/${req.params.style}`);
    });

    app.get('/images/:image', function(req, res) {
        res.sendFile(`${__dirname}/images/${req.params.image}`);
    });

    app.get('/fonts/:font', function(req, res) {
        res.sendFile(`${__dirname}/fonts/${req.params.font}`);
    });

    app.get('/ping', function(req, res) {
        res.send("pong");
    });
}
 
module.exports = { configure };