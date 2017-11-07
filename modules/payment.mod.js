exports.name = "payment";
exports.version = "1.00";
exports.description = "Gestion des paiements";
exports.rights = [{
        "desc": "Lire les paiements",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Créer ou modifier les paiements",
        "perm": {
            "create": true
        }
    },
    {
        "desc": "Valider les paiments",
        "perm": {
            "validate": false
        }
    },
    {
        "desc": "Annueler les paiements",
        "perm": {
            "delete": false
        }
    },
    {
        "desc": "Annuler une ligne de paiement",
        "perm": {
            "cancel": false
        }
    },
    {
        "desc": "Rejeter un paiement",
        "perm": {
            "reject": false
        }
    }
];
exports.menus = {
    "menu:accounting": {
        "position": 80,
        "perms": "bill.read",
        "enabled": "$conf->facture->enabled",
        "usertype": 2,
        "icon": "fa-money",
        "title": "compta:MenuFinancial",
        "submenus": {

        }
    }
};