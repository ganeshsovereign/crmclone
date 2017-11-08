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



exports.name = "bill";
exports.version = '1.00';
exports.enabled = true;
exports.description = "Gestion des factures";

exports.rights = [{
        "desc": "Lire les factures",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Creer/modifier les factures",
        "perm": {
            "create": false
        }
    },
    {
        "desc": "Dévalider les factures",
        "perm": {
            "unvalidate": false
        }
    },
    {
        "desc": "Valider les factures",
        "perm": {
            "validate": true
        }
    },
    {
        "desc": "Envoyer les factures par mail",
        "perm": {
            "send": true
        }
    },
    {
        "desc": "Emettre des paiements sur les factures",
        "perm": {
            "paiment": false
        }
    },
    {
        "desc": "Supprimer les factures",
        "perm": {
            "delete": false
        }
    },
    {
        "desc": "Exporter les factures clients, attributs et reglements",
        "perm": {
            "export": false
        }
    }
];

exports.menus = {
    "menu:invoices": {
        "position": 70,
        "perms": "bill.read",
        "enabled": "$conf->facture->enabled",
        "usertype": 2,
        "icon": "fa-files-o",
        "title": "orders:Bills",
        route: "bill",
        "submenus": {
            "menu:billslist": {
                "position": 1,
                route: "bill.list",
                params: {
                    forSales: 1
                },
                "perms": "bill.read",
                "icon": "fa-money",
                "enabled": "$conf->facture->enabled",
                "usertype": 2,
                "title": "orders:CustomersInvoices"
            },
            "menu:billssupplierlist": {
                "position": 10,
                route: "bill.list",
                params: {
                    forSales: 0
                },
                "perms": "bill.supplier.read",
                "icon": "fa-money",
                "enabled": "$conf->facture->enabled",
                "usertype": 2,
                "title": "orders:SuppliersInvoices"
            }
        }
    }
};