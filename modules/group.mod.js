exports.name = 'group';
exports.version = '1.00';
exports.enabled = true;
exports.description = 'Gestion des groupes';
exports.rights = [{
        "desc": "Consulter les groupes",
        "perm": {
            "read": false
        }
    },
    {
        "desc": "Consulter les permissions des groupes",
        "perm": {
            "readperms": false
        }
    },
    {
        "desc": "Creer/modifier les groupes et leurs permissions",
        "perm": {
            "write": false
        }
    },
    {
        "desc": "Supprimer ou desactiver les groupes",
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