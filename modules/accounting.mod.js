exports.name = "accounting";
exports.version = "1.00";
exports.enabled = true;
exports.description = "Gestion de la comptabilite";
exports.rights = [{
        "desc": "Lire les ecritures comptables",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Exporter les ecritures comptables",
        "perm": {
            "export": false
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
            "menu:groupchq": {
                "position": 16,
                "url": "/erp/#!/bank/payment/chq",
                "perms": "payment.read",
                "enabled": "$conf->payment->enabled",
                "usertype": 2,
                "icon": "fa-credit-card",
                "title": "Remises de cheques"
            },
            "menu:-----------------": {
                "position": 19,
                "title": "--"
            },
            "menu:accountingClient": {
                "position": 20,
                "url": "/erp/#!/accounting/journal?journal=VTE",
                "perms": "accounting.read",
                "enabled": "$conf->accounting->enabled",
                "icon": "fa-random",
                "usertype": 2,
                "title": "compta:SellsJournal"
            },
            "menu:accountingSupplier": {
                "position": 30,
                "url": "/erp/#!/accounting/journal?journal=ACH",
                "perms": "accounting.read",
                "enabled": "$conf->accounting->enabled",
                "icon": "fa-random",
                "usertype": 2,
                "title": "compta:PurchasesJournal"
            },
            "menu:accountingOD": {
                "position": 40,
                "url": "/erp/#!/accounting/journal?journal=OD",
                "perms": "accounting.read",
                "enabled": "$conf->accounting->enabled",
                "icon": "fa-random",
                "usertype": 2,
                "title": "compta:ODJournal"
            },
            "menu:accountingBank": {
                "position": 50,
                "url": "/erp/#!/accounting/bank",
                "perms": "accounting.read",
                "enabled": "$conf->accounting->enabled",
                "icon": "fa-random",
                "usertype": 2,
                "title": "compta:BankAccounts"
            },
            "menu:accountingBalance": {
                "position": 60,
                "url": "/erp/#!/accounting/balance",
                "perms": "accounting.read",
                "enabled": "$conf->accounting->enabled",
                "icon": "fa-random",
                "usertype": 2,
                "title": "compta:AccountingBalance"
            }
        }
    }
};