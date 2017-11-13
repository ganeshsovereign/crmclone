/**
Copyright 2017 ToManage

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

@author    ToManage SAS <contact@tomanage.fr>
@copyright 2014-2017 ToManage SAS
@license   http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
International Registered Trademark & Property of ToManage SAS
*/



exports.name = 'stock';
exports.version = '1.00';
exports.enabled = true;
exports.description = "Gestion du stock";
exports.rights = {};
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