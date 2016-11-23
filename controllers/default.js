exports.install = function () {
    F.route('/', view_homepage);
};

function view_homepage() {
    var self = this;
    self.redirect('/erp');
}
