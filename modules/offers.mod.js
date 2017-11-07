exports.name = 'offers';
exports.version = '1.00';
exports.enabled = true;
exports.description = "Gestion des devis et demandes d'achats";
exports.rights = [{
        "desc": "Lire les propositons commerciales clients",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Creer/modifier les propositions commerciales clients",
        "perm": {
            "create": false
        }
    },
    {
        "desc": "Valider les propositions commerciales clients",
        "perm": {
            "validate": false
        }
    },
    {
        "desc": "Re-ouvrir les propositions commerciales clients",
        "perm": {
            "reopen": false
        }
    },
    {
        "desc": "Envoyer les propositions commerciales clients",
        "perm": {
            "send": true
        }
    },
    {
        "desc": "Cloturer les propositions commerciales clients",
        "perm": {
            "closed": false
        }
    },
    {
        "desc": "Supprimer les propositions commerciales clients",
        "perm": {
            "delete": false
        }
    },
    {
        "desc": "Exporter les propositions commerciales clients et attributs",
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