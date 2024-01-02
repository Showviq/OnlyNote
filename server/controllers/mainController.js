exports.homePage = async(req, res) =>{
    // app.get('/', function(req, res) {
        const locals = {
            title: 'OnlyNote',
            description: 'Free Notes Application'
        }
        // res.render('index', locals);
        res.render('index', {
            locals,
            layout: '../views/layouts/front-page'
          });
    // });
}

exports.about = async(req, res) =>{
    // app.get('/', function(req, res) {
        const locals = {
            title: 'About OnlyNote',
            description: 'Free Notes Application'
        }
        res.render('about', locals);
    // });
}