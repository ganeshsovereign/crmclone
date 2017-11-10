exports.name = 'absence';
exports.version = '1.00';
exports.enabled = true;
exports.description = 'Gestion des absences';
exports.rights = [{
        "desc": "Consulter les absences",
        "perm": {
            "read": false
        }
    },
    {
        "desc": "Creer/modifier les absences",
        "perm": {
            "write": false
        }
    },
    {
        "desc": "Supprimer les absences",
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
        "submenus": {
            "menu:absences": {
                "position": 1,
                "url": "/erp/#!/europexpress/absence.html",
                "perms": "user.holidayAll",
                "usertype": 2,
                "icon": "fa-group",
                "title": "users:LeaveManagement"
            },
            "settings.entity": {
                "position": 20,
                "url": "/erp/#!/settings/entity",
                "perms": [
                    ["superadmin"],
                    ["admin", "entity.read"]
                ],
                "enabled": "$conf->entity->enabled",
                "usertype": 2,
                "title": "companies:ManagementEntity",
                "icon": "fa-globe"
            },
            "menu:groups": {
                "position": 30,
                "url": "/erp/#!/group",
                "perms": "group.read",
                "usertype": 2,
                "icon": "fa-group",
                "title": "users:GroupManagement"
            },
            "settings.product": {
                "position": 50,
                "url": "/erp/#!/settings/product",
                "perms": "settings.read",
                "usertype": 2,
                "title": "products:ProductManagement",
                "icon": "fa-globe"
            },

            "menu:team": {
                "position": 60,
                "url": "/erp/#!/user",
                "perms": "user.read",
                "usertype": 2,
                "icon": "fa-group",
                "title": "users:Collaborators"
            },
            "menu:modules": {
                "position": 70,
                "enabled": "$user->admin",
                "url": "",
                "perms": "admin",
                "icon": "fa-cog",
                "usertype": 2,
                "title": "admin:Modules"
            },
            "menu:systemtools": {
                "position": 80,
                "usertype": 2,
                "enabled": "$user->admin",
                "title": "admin:SystemTools",
                "perms": "admin",
                "icon": "fa-briefcase",
                "submenus": {
                    "menu:audit": {
                        "position": 1,
                        "perms": "admin",
                        "url": "",
                        "usertype": 2,
                        "title": "admin:Audit"
                    },
                    "menu:sessions": {
                        "position": 5,
                        "perms": "admin",
                        "url": "",
                        "usertype": 2,
                        "title": "admin:Sessions"
                    }
                }
            }
        }
    }
};