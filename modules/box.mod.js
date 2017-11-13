exports.name = 'parameters';
exports.version = '1.00';
exports.enabled = true;
exports.description = 'Gestion des paramètres';
exports.rights = [{
        "desc": "Connexion des utilisateurs",
        "perm": {
            "infologin": false
        }
    },
    {
        "desc": "Liste de absences",
        "perm": {
            "absence": false
        }
    },
    {
        "desc": "indicateur du mois",
        "perm": {
            "indicateur": false
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