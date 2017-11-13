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



exports.name = 'product';
exports.version = '1.00';
exports.enabled = true;

exports.csv = {
    "model": "product",
    "schema": "productSchema",
    "aliases": {
        "info.SKU": "Ref interne",
        "ProductTypes.langs[_language].name": "Type",
        "info.langs[_language].name": "Nom",
        "prices.pu_ht": "Prix vente HT",
        "directCost": "Prix achat HT",
        "weight": "Poids",
        "updatedAt": "Date modif",
        "rating.total": "Rating",
        "Status": "Etat",
        "ProductFamily.langs[_language].name": "Famille"
    },
    "arrayKeys": {},
    "formatters": {
        "Date modif": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },

        "Etat": function(Status) {
            const ProductStatus = MODEL('product').Status;
            let result = MODULE('utils').Status(Status, ProductStatus);
            return result.name;
        }
    }
};

exports.description = 'Gestion des produits';
exports.rights = [{
        "desc": "Lire les produits",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Creer/modifier les produits",
        "perm": {
            "create": false
        }
    },
    {
        "desc": "Supprimer les produits",
        "perm": {
            "delete": false
        }
    },
    {
        "desc": "Exporter les produits",
        "perm": {
            "export": false
        }
    },
    {
        "desc": "Importer les produits",
        "perm": {
            "import": false
        }
    },
    {
        "desc": "Modifier les listes de prix",
        "perm": {
            "priceLevel": false
        }
    }
];
exports.menus = {
    "menu:products": {
        "position": 10,
        "perms": "product.read",
        "enabled": "$conf->product->enabled || $conf->service->enabled",
        "usertype": 2,
        "icon": "fa-cubes",
        "title": "products:Products/Services",
        "submenus": {
            "menu:productlist": {
                "url": "/erp/#!/product",
                "position": 10,
                "usertype": 2,
                "perms": "product.read",
                "enabled": "$conf->product->enabled",
                "icon": "fa-cubes",
                "title": "products:ListProducts"
            },
            "menu:productpricelevel": {
                "url": "/erp/#!/product/pricelevel.html",
                "position": 20,
                "usertype": 2,
                "perms": "product.readTODO",
                "enabled": true,
                "icon": "fa fa-money",
                "title": "products:PriceLevel"
            },
            "menu:-----------------": {
                "position": 30,
                "title": "--"
            },
            "menu:productattributes": {
                "url": "/erp/#!/product/attributeslist",
                "position": 40,
                "usertype": 2,
                "perms": "product.read",
                "enabled": "$conf->product->enabled",
                "icon": "icon-settings",
                "title": "products:ListOfAttributes"
            },
            "menu:productfamily": {
                "url": "/erp/#!/product/familyproductlist",
                "position": 50,
                "usertype": 2,
                "perms": "product.read",
                "enabled": "$conf->product->enabled",
                "icon": "fa fa-bars",
                "title": "products:FamilyProducts"
            },
            "menu:productcategories": {
                "url": "/erp/#!/product/productcategories",
                "position": 60,
                "usertype": 2,
                "perms": "product.read",
                "enabled": "$conf->product->enabled",
                "icon": "fa fa-share-alt",
                "title": "products:ProductCategories"
            },
            "menu:images": {
                "url": "/erp/#!/product/images.html",
                "position": 70,
                "usertype": 2,
                "perms": "product.read",
                "enabled": "$conf->product->enabled",
                "icon": "fa fa-picture-o",
                "title": "products:Images"
            },
            "menu:productconsumption": {
                "url": "/erp/#!/product/consumption.html",
                "position": 20,
                "usertype": 2,
                "perms": "product.read",
                "enabled": "$conf->product->enabled",
                "icon": "fa-line-chart",
                "title": "products:Consumptions"
            }
        }
    }
};
exports.filters = {
    "salesProduct": {
        "Status": {
            "displayName": "Status",
            "backend": "Status",
            "type": "string"
        },

        "sellFamily": {
            "displayName": "products:Family",
            "backend": "sellFamily"
        },

        "date": {
            "type": "date",
            "backend": {
                "key": "updateAt",
                "operator": ["$gte", "$lte"]
            }
        },

        "isSell": {
            "type": "checked",
            "backend": "isSell",
            "options": {
                "values": [true, false]
            }
        },

        "isBuy": {
            "backend": "isBuy",
            "type": "checked",
            "options": {
                "values": [true, false]
            }
        },

        "isActive": {
            "backend": "info.isActive",
            "type": "boolean"
        },

        "array": ["Status", "name", "date", "isSell", "isBuy", "isActive"]
    }
};