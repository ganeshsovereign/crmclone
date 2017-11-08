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



const moment = require('moment');

exports.name = 'delivery';
exports.version = '1.00';
exports.enabled = true;

exports.csv = {
    "model": "order",
    "schema": "GoodsOutNote",
    "aliases": {
        "supplier.fullName": "Client",
        "ref": "Ref",
        "ref_client": "Ref_Client",
        "salesPerson.fullName": "Commercial",
        "datedl": "Date exp",
        "qty": "Qte",
        "Status": "Statut",
        "entity": "Entite",
        "status.isPrinted": "Impression",
        "status.isPicked": "Scanne",
        "status.isPacked": "Emballe",
        "status.isShipped": "Expedie",
        "status.printedBy": "Impression par",
        "status.pickedBy": "Scanne par",
        "status.packedBy": "Emballe par",
        "status.shippedBy": "Expedie par",
        "datec": "Date creation",
        "weight": "Poids"
        //"createdBy.user": "Created By User",
        //"createdBy.date": "Created By Date",
        //"editedBy.user": "Edited By User",
        //"editedBy.date": "Edited By Date"
    },

    "arrayKeys": {
        // "groups.users": true,
        // "groups.group": true
    },

    "formatters": {
        "Date exp": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },

        "Date creation": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },

        "Statut": function(Status) {
            const OrderStatus = MODEL('order').Status;

            let result = MODULE('utils').Status(Status, OrderStatus);
            return result.name;
        },
        "Impression": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },
        "Scanne": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },
        "Emballe": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },
        "Expedie": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        }
    }
};

exports.description = "Gestion des bon de livraisons";
exports.rights = [{
        "desc": "Lire les bons livraisons clients",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Creer/modifier les bons livraisons clients",
        "perm": {
            "create": false
        }
    },
    {
        "desc": "Valider les bons livraisons clients",
        "perm": {
            "validate": false
        }
    },
    {
        "desc": "Envoyer les bons livraisons clients",
        "perm": {
            "send": true
        }
    },
    {
        "desc": "Cloturer les bons livraisons clients",
        "perm": {
            "closed": false
        }
    },
    {
        "desc": "Re-ouvrir un bon de livraison",
        "perm": {
            "reopen": false
        }
    },
    {
        "desc": "Annuler les bons livraisons clients",
        "perm": {
            "cancel": false
        }
    },
    {
        "desc": "Supprimer les bons livraisons clients",
        "perm": {
            "delete": false
        }
    },
    {
        "desc": "Affichager la pre-facturation des bons de livraisons",
        "perm": {
            "prefac": false
        }
    },
    {
        "desc": "Générer la facturation des bons de livraisons",
        "perm": {
            "createBills": false
        }
    },
    {
        "desc": "Exporter les bons livraisons clients et attributs",
        "perm": {
            "export": false
        }
    }
];
exports.menus = {
    "menu:delivery": {
        "position": 50,
        "perms": "delivery.read",
        "enabled": "delivery.enabled",
        "usertype": 2,
        "icon": "fa-truck",
        "title": "orders:Logistics",
        "submenus": {
            "menu:deliverylist": {
                "position": 1,
                "url": "/erp/#!/delivery",
                "perms": "delivery.read",
                "enabled": "delivery->enabled",
                "usertype": 2,
                "icon": "fa-truck",
                "title": "orders:PreparationReceipt"
            },
            "menu:deliverysuppliers": {
                "position": 5,
                "url": "/erp/#!/deliverysupplier",
                "perms": "delivery.read",
                "enabled": "delivery->enabled",
                "usertype": 2,
                "icon": "fa-truck",
                "title": "orders:SuppliersDeliveries"
            },
            "menu:stockreturn": {
                "position": 15,
                "url": "/erp/#!/stockreturn",
                "perms": "delivery.read",
                "enabled": "delivery->enabled",
                "usertype": 2,
                "icon": "fa-refresh",
                "title": "orders:StockReturn"
            }
        }
    }
};
exports.filters = {
    "delivery": {
        "forSales": {
            "backend": "forSales",
            "type": "boolean"
        },

        "ref": {
            "displayName": "Ref",
            "backend": "ref",
            "type": "regex"
        },

        "ref_client": {
            "displayName": "Ref customer",
            "backend": "ref_client",
            "type": "regex"
        },

        "entity": {
            "displayName": "Entity",
            "backend": "entity",
            "type": "string"
        },

        "Status": {
            "displayName": "Status",
            "backend": "Status",
            "type": "string"
        },

        "supplier": {
            "displayName": "Customer",
            "backend": "supplier"
        },

        "warehouse": {
            "displayName": "Warhouse",
            "backend": "warehouse"
        },

        "salesPerson": {
            "displayName": "Assigned To",
            "backend": "salesPerson"
        },

        "workflow": {
            "displayName": "Status",
            "backend": "workflow._id"
        },

        "channel": {
            "displayName": "Channel",
            "backend": "channel._id"
        },

        "name": {
            "displayName": "Reference",
            "backend": "_id"
        },

        "datedl": {
            "type": "date",
            "backend": {
                "key": "datedl",
                "operator": ["$gte", "$lte"]
            }
        },

        "datec": {
            "type": "date",
            "backend": {
                "key": "datec",
                "operator": ["$gte", "$lte"]
            }
        },

        "array": ["supplier", "salesPerson", "workflow", "channel", "name"]
    }
};