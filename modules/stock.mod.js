exports.name = 'stock';
exports.version = '1.00';
exports.enabled = true;
exports.description = "Gestion du stock";
exports.rights = {

};
exports.menus = {
    "menu:stock": {
        "position": 60,
        "perms": "stock.read",
        "enabled": "$conf->stock->enabled",
        "usertype": 2,
        "icon": "fa-random",
        "title": "Stock",
        "submenus": {
            "menu:inventory": {
                "url": "/erp/#!/product/inventory",
                "position": 10,
                "usertype": 2,
                "perms": "product.read",
                "enabled": "$conf->product->enabled",
                "icon": "fa fa-line-chart",
                "title": "products:Inventory"
            },
            "menu:stockdetail": {
                "url": "/erp/#!/product/stockdetail",
                "position": 40,
                "usertype": 2,
                "perms": "product.read",
                "enabled": "$conf->product->enabled",
                "icon": "fa fa-line-chart",
                "title": "products:StockDetail"
            },
            "menu:stockcorrestion": {
                "url": "/erp/#!/product/stockcorrectionlist",
                "position": 50,
                "usertype": 2,
                "perms": "product.read",
                "enabled": "$conf->product->enabled",
                "icon": "fa fa-pencil",
                "title": "products:StockCorrection"
            }
        }
    }
};