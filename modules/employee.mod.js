exports.name = "employee";
exports.version = '1.00';
exports.enabled = true;
exports.description = "Gestion des Collaborateurs";

exports.rights = [{
        "desc": "Lire la liste des collaborateurs",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Creer/modifier un ou des collaborateurs",
        "perm": {
            "create": false
        }
    },
    {
        "desc": "Modifier un ou des collaborateurs",
        "perm": {
            "entity": false
        }
    }
];

exports.menus = {
    "menu:HR": {
        "position": 90,
        "perms": "employee.read",
        "enabled": "$conf->bank->enabled",
        "usertype": 2,
        "title": "HR",
        "icon": "fa-group",
        "submenus": {
            "menu:employees": {
                "position": 10,
                "url": "/erp/#!/employee",
                "perms": "employee.read",
                "enabled": "$conf->employees->enabled",
                "usertype": 2,
                "icon": "fa-user",
                "title": "users:Employees"
            }
        }
    }
};