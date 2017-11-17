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



exports.name = 'purchase';
exports.version = '1.00';
exports.enabled = true;
exports.description = "Gestion des achats";
exports.rights = [{
        "desc": "Lire les achats",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Creer/modifier les achats",
        "perm": {
            "create": false
        }
    },
    {
        "desc": "Valider les achats",
        "perm": {
            "delete": false
        }
    },
    {
        "desc": "Re-ouvrir les achats",
        "perm": {
            "reopen": false
        }
    },
    {
        "desc": "Envoyer les achats",
        "perm": {
            "send": true
        }
    },
    {
        "desc": "Cloturer les achats",
        "perm": {
            "closed": false
        }
    },
    {
        "desc": "Supprimer les achats",
        "perm": {
            "delete": false
        }
    },
    {
        "desc": "Exporter les achats et attributs",
        "perm": {
            "export": false
        }
    }
];
exports.menus = {
    "menu:purchase": {
        "position": 40,
        "perms": "offer.read",
        "enabled": "$conf->offer->enabled",
        "usertype": 2,
        "icon": "fa-credit-card",
        "title": "orders:Purchases",
        "submenus": {
            "menu:offersupplier": {
                "position": 30,
                "url": "/erp/#!/offersupplier",
                "perms": "purchase.read",
                "enabled": "$conf->offersupplier->enabled",
                "usertype": 2,
                "title": "orders:PurchaseRequests",
                "icon": "fa-institution"
            },
            "menu:ordersupplier": {
                "position": 40,
                "url": "/erp/#!/ordersupplier",
                "perms": "purchase.read",
                "enabled": "$conf->ordersupplier->enabled",
                "usertype": 2,
                "title": "orders:SuppliersOrders",
                "icon": "fa-institution"
            }
        }
    }
};