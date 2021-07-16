function configure(app){
    const getPage = function(req, res) {
        res.sendFile(`${__dirname}/${req.params.page}.html`);
    }
    
    app.get('/', function(req, res, next) {
        req.params.page = 'index';
        next();
    }, getPage);

    app.get('/ping', function(req, res) {
        res.send("pong");
    });
    
    app.get('/:page', getPage);
    
    app.get('/scripts/:script', function(req, res) {
        res.sendFile(`${__dirname}/scripts/${req.params.script}`);
    });
    
    app.get('/styles/:style', function(req, res) {
        res.sendFile(`${__dirname}/styles/${req.params.style}`);
    });
}
 
module.exports = { configure };