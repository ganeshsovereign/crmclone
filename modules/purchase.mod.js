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
                "perms": "offersuppliers.read",
                "enabled": "$conf->offersupplier->enabled",
                "usertype": 2,
                "title": "orders:PurchaseRequests",
                "icon": "fa-institution"
            },
            "menu:ordersupplier": {
                "position": 40,
                "url": "/erp/#!/ordersupplier",
                "perms": "ordersuppliers.read",
                "enabled": "$conf->ordersupplier->enabled",
                "usertype": 2,
                "title": "orders:SuppliersOrders",
                "icon": "fa-institution"
            }
        }
    }
};