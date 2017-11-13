exports.name = 'entity';
exports.version = '1.00';
exports.enabled = true;
exports.description = 'Gestion des entités';
exports.rights = [{
        "desc": "Lister les entités",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Creer/modifier les entités",
        "perm": {
            "create": false
        }
    },
    {
        "desc": "Supprimer les entités",
        "perm": {
            "delete": false
        }
    }
];
exports.menus = {
    "menu:parameters": {
        "position": 1000,
        "url": "",
        "enabled": "settings.read",
        "usertype": 2,
        "title": "Parameters",
        "icon": "fa-cogs",
        "submenus": {}
    }
};