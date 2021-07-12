function configure(app){
    const getPage = function(req, res) {
        //console.log(`Request page ${req.params.page}`);
        res.sendFile(`${__dirname}/pages/${req.params.page}.html`);
    }
    
    app.get('/', function(req, res, next) {
        req.params.page = 'index';
        next();
    }, getPage);
    
    app.get('/page/:page', getPage);
    
    app.get('/script/:script', function(req, res) {
        //console.log(`Request script ${req.params.script}`);
        res.sendFile(`${__dirname}/scripts/${req.params.script}.js`);
    });
    
    app.get('/style/:style', function(req, res) {
        //console.log(`Request style ${req.params.style}`);
        res.sendFile(`${__dirname}/styles/${req.params.style}.css`);
    });
}
 
module.exports = { configure };