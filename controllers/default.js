exports.install = function () {
    // COMMON
    F.route('/', view_homepage);
    F.route('#contact', view_contact);

    // CMS rendering
    F.route('/*', view_page);

    // FILES
    F.file('/images/s/*', file_image);//small
    F.file('/images/l/*', file_image);//large
    F.file('/download/', file_read);
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

// ==========================================================================
// COMMON
// ==========================================================================

// Homepage
function view_homepage() {
    var self = this;

    // Increases the performance (1 minute cache)
    self.memorize('cache.homepage', '1 minute', DEBUG, function () {
        var options = {};
        options.max = 12;
        options.homepage = true;
        MODEL('product').Schema.query(options, function (err, response) {
            // Finds "homepage"
            self.page('/', 'index', response, false, true);
        });
    });
}

// Contact with contact form
function view_contact() {
    var self = this;
    self.render(self.url, 'contact');
}

// ==========================================================================
// CMS (Content Management System)
// ==========================================================================

function view_page() {
    var self = this;
    // models/pages.js --> Controller.prototype.render()
    self.render(self.url);
}

// ==========================================================================
// FILES
// ==========================================================================

// Reads a specific file from database
// For images (jpg, gif, png) supports percentual resizing according "?s=NUMBER" argument in query string e.g.: .jpg?s=50, .jpg?s=80 (for image galleries)
// URL: /download/*.*
function file_read(req, res) {

    var id = req.split[1].replace('.' + req.extension, '');

    if (!req.query.s || (req.extension !== 'jpg' && req.extension !== 'gif' && req.extension !== 'png')) {
        // Reads specific file by ID
        F.exists(req, res, function (next, filename) {
            DB().readFile(ObjectID.parse(id), function (err, fs, close) {

                if (err) {
                    next();
                    return res.throw404();
                }

                fs.stream(true).on('end', function () {
                    res.file(filename);
                    next();
                }).pipe(require('fs').createWriteStream(filename));
            });
        });
        return;
    }

    // Custom image resizing

    // Small hack for the file cache.
    // F.exists() uses req.uri.pathname for creating temp identificator and skips all query strings by creating (because this hack).
    if (req.query.s)
        req.uri.pathname = req.uri.pathname.replace('.', req.query.s + '.');

    // Below method checks if the file exists (processed) in temporary directory
    // More information in total.js documentation
    F.exists(req, res, 10, function (next, filename) {
        // Reads specific file by ID
        DB().readFile(ObjectID.parse(id), function (err, fs, close) {

            if (err) {
                next();
                return res.throw404();
            }

            fs.stream(true).on('end', function () {

                // Image processing
                res.image(filename, function (image) {
                    image.output(req.extension);
                    if (req.extension === 'jpg')
                        image.quality(85);
                    image.resize(req.query.s + '%');
                    image.minify();
                });

                // Releases F.exists()
                next();
            }).pipe(require('fs').createWriteStream(filename));
        });
    });
}

// Reads specific picture from database
// URL: /images/small|large/*.jpg
function file_image(req, res) {
    // Below method checks if the file exists (processed) in temporary directory
    // More information in total.js documentation
    //console.log(req.split);
    F.exists(req, res, 10, function (next, filename) {
        var model;

        switch (req.split[2]) {
            case 'p':
                model = 'product';
                break;
            case 'c':
                model = 'category';
                break;
            default :
                return res.throw404();
        }

        var Model = MODEL(model).Schema;

        Model.getFile(req.split[5], function (err, fs) {

            if (err) {
                next();
                return res.throw404();
            }

            //if (self.query.download)
            //    return self.stream(store.contentType, store.stream(true), store.metadata.originalFilename); // for downloading 


            //self.stream(store.contentType, store.stream(true));

            //});


            //DB().readFile(ObjectID.parse(req.split[2].replace('.jpg', '')), function (err, fs, close) {


            fs.stream(true).on('end', function () {

                // Image processing
                res.image(filename, function (image) {
                    image.output('jpg');
                    image.quality(90);

                    if (req.split[1] === 'l')//large
                        image.miniature(600, 400);
                    else
                        image.miniature(200, 150);

                    image.minify();
                });

                // Releases F.exists()
                next();
            }).pipe(require('fs').createWriteStream(filename));
        });
    });
}