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



exports.name = 'orders';
exports.version = '1.00';
exports.enabled = true;
exports.description = 'Gestion des commandes clients';
exports.rights = [{
        "desc": "Lire les commandes clients",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Creer/modifier les commandes clients",
        "perm": {
            "create": false
        }
    },
    {
        "desc": "Valider les commandes clients",
        "perm": {
            "validate": false
        }
    },
    {
        "desc": "Re-ouvrir les commandes clients",
        "perm": {
            "reopen": false
        }
    },
    {
        "desc": "Envoyer les commandes clients",
        "perm": {
            "send": true
        }
    },
    {
        "desc": "Clôturer les commandes clients",
        "perm": {
            "closed": false
        }
    },
    {
        "desc": "Annuler les commandes clients",
        "perm": {
            "cancel": false
        }
    },
    {
        "desc": "Supprimer les commandes clients",
        "perm": {
            "delete": false
        }
    },
    {
        "desc": "Expedier les commandes clients",
        "perm": {
            "createDelivery": false
        }
    },
    {
        "desc": "Exporter les commandes clients et attributs",
        "perm": {
            "export": false
        }
    }
];
exports.menus = {
    "menu:orders": {
        "position": 30,
        "perms": "order.read",
        "enabled": "$conf->commande->enabled",
        "usertype": 2,
        "icon": "fa-shopping-cart",
        "title": "orders:Orders",
        "submenus": {
            "menu:offerlist": {
                "position": 40,
                "url": "/erp/#!/offer",
                "perms": "offer.read",
                "enabled": "$conf->offer->enabled",
                "usertype": 2,
                "icon": "fa-calculator",
                "title": "orders:CommercialProposals"
            },
            "menu:orderslist": {
                "position": 50,
                "url": "/erp/#!/order",
                "perms": "order.read",
                "enabled": "$conf->commande->enabled",
                "usertype": 2,
                "icon": "fa-shopping-cart",
                "title": "orders:ListOfOrders"
            }
        }
    }
};
exports.filters = {
    "order": {
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

        "salesPerson": {
            "displayName": "Assigned To",
            "backend": "salesPerson"
        },

        "workflow": {
            "displayName": "Status",
            "backend": "workflow._id"
        },

        "allocationStatus": {
            "displayName": "Allocation Status",
            "backend": "status.allocateStatus",
            "type": "string"
        },

        "fulfilledStatus": {
            "displayName": "Fulfilled Status",
            "backend": "status.fulfillStatus",
            "type": "string"
        },

        "shippingStatus": {
            "displayName": "Shipping Status",
            "backend": "status.shippingStatus",
            "type": "string"
        },


        "invoiceStatus": {
            "displayName": "Invoice Status",
            "backend": "status.invoiceStatus",
            "type": "string"
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


        "array": ["supplier", "salesPerson", "workflow", "allocationStatus", "fulfilledStatus", "shippingStatus", "channel", "name"]
    },
    "invoice": {
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

        "salesPerson": {
            "displayName": "Assigned To",
            "backend": "salesPerson"
        },

        "channel": {
            "displayName": "Channel",
            "backend": "channel._id"
        },

        "name": {
            "displayName": "Reference",
            "backend": "_id"
        },

        "dater": {
            "type": "date",
            "backend": {
                "key": "dater",
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