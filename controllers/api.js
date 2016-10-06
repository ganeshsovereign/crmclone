// API for e.g. Mobile application
// This API uses the website

exports.install = function () {
    // COMMON
    F.route('/api/ping/', json_ping);
    
    // CARTS
    F.route('/api/cart/', json_cart_addAuth, ['json','post', 'authorized']);
    F.route('/api/cart/', json_cart_add, ['json','post','unauthorized']);

    // ORDERS
    F.route('/api/checkout/create/', json_orders_create, ['post', '*Order']);
    F.route('/api/checkout/{id}/', json_orders_read, ['*Order']);

    // USERS
    //F.route('/api/users/create/',         json_users, ['post', '*UserRegistration']);
    F.route('/api/users/password/', json_users, ['post', '*UserPassword']);
    //F.route('/api/users/login/',          json_users, ['post', '*UserLogin']);
    //F.route('/api/users/settings/',       json_users_settings, ['put', '*UserSettings', 'authorize']);

    // PRODUCTS
    F.route('/api/products/', json_products_query, []);
    F.route('/api/products/{id}/', json_products_read, ['*Product']);
    F.route('/api/products/categories/', json_products_categories, ['*Product']);

    // NEWSLETTER
    F.route('/api/newsletter/', json_newsletter, ['post', '*Newsletter']);

    // CONTACTFORM
    F.route('/api/contact/', json_contact, ['post', '*Contact']);
};

// ==========================================================================
// COMMON
// ==========================================================================

function json_ping() {
    var self = this;
    self.plain('null');
}

// ==========================================================================
// CARTS
// ==========================================================================

function json_cart_addAuth(){
    var self=this;
    
    console.log(self.user);
};

function json_cart_add(){
    var self=this;
    console.log(self.body);
    console.log("toto");
    
    var ProductModel = MODEL('product').Schema;
    
    ProductModel.findPrice({_id: self.body.product, qty:self.body.qty}, function(err, doc){
        if(err)
            return console.log(err);
        self.json(doc);
    });
    
};

// ==========================================================================
// PRODUCTS
// ==========================================================================

// Reads product categories
function json_products_categories() {
    var self = this;

    if (!F.global.categories)
        F.global.categories = [];

    self.json(F.global.categories);
}

// Reads products
function json_products_query() {
    var self = this;
    var ProductModel = MODEL('product').Schema;

    // Renders related products
    if (self.query.html) {
        // Disables layout
        self.layout('');
        self.$query(self.query, self.callback('~eshop/partial-products'));
        return;
    }

    ProductModel.query(self.query, self.callback());
}

// Reads a specific product
function json_products_read(id) {
    var self = this;
    var options = {};
    options.id = id;
    self.$get(options, self.callback());
}

// ==========================================================================
// ORDERS
// ==========================================================================

// Creates a new order
function json_orders_create() {
    var self = this;
    self.body.ip = self.ip;
    self.body.language = self.language;
    self.body.iduser = self.user ? self.user.id : '';
    self.body.$workflow('create', self.callback());
}

// Reads a specific order
function json_orders_read(id) {
    var self = this;
    var options = {};
    options.id = id;
    self.$get(options, self.callback());
}

// ==========================================================================
// USERS
// ==========================================================================

function json_users() {
    var self = this;
    var options = {};

    options.controller = self;
    options.ip = self.ip;

    self.body.$workflow('exec', options, self.callback());
}

function json_users_settings() {
    var self = this;
    var options = {};
    options.controller = self;
    self.body.id = self.user.id;
    self.body.$save(options, self.callback());
}

// ==========================================================================
// NEWSLETTER
// ==========================================================================

// Appends a new email into the newsletter list
function json_newsletter() {
    var self = this;
    self.body.language = self.language || '';
    self.body.ip = self.ip;
    self.body.$save(self.callback());
}

// ==========================================================================
// CONTACTFORM
// ==========================================================================

// Processes the contact form
function json_contact() {
    var self = this;
    self.body.language = self.language || '';
    self.body.ip = self.ip;
    self.body.$save(self.callback());
}