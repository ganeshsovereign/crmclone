exports.install = function() {
    F.route('/print/product', view_product);
};

function view_product() {
    var self = this;
    self.meta('Product');

    self.view('product', { product: {} });
}