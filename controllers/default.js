exports.install = function () {

    if(!CONFIG('default-theme'))
        F.route('/', view_homepage);
};

// Sets the default language for all controllers
F.on('controller', function (controller, name) {

    var language = controller.req.language;

    // Sets the language from the query string
    if (controller.query.language) {
        controller.language = controller.query.language;
        return;
    }

    controller.language = 'en';

    if (language.indexOf('fr') > -1)
        controller.language = 'fr';
});

function view_homepage(){
    console.log("toto");
    var self=this;
    self.redirect('/erp');
}
