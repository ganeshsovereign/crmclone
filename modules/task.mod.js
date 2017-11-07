exports.name = "task";
exports.version = "1.00";
exports.description = "Gestion des taches";
exports.rights = {
    "task": [{
            "desc": "Lire les taches",
            "perm": {
                "read": true
            }
        },
        {
            "desc": "Creer/modifier des taches",
            "perm": {
                "create": false
            }
        },
        {
            "desc": "Supprimer des taches",
            "perm": {
                "delete": false
            }
        },
        {
            "desc": "Voir les taches des autres utilisateurs",
            "perm": {
                "readAll": false
            }
        }
    ]
};