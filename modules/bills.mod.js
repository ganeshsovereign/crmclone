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
                params: { forSales: 1 },
                "perms": "bill.read",
                "icon": "fa-money",
                "enabled": "$conf->facture->enabled",
                "usertype": 2,
                "title": "orders:CustomersInvoices"
            },
            "menu:billssupplierlist": {
                "position": 10,
                route: "bill.list",
                params: { forSales: 0 },
                "perms": "bill.supplier.read",
                "icon": "fa-money",
                "enabled": "$conf->facture->enabled",
                "usertype": 2,
                "title": "orders:SuppliersInvoices"
            }
        }
    }
};