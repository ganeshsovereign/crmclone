/**
Copyright 2017 ToManage

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

@author    ToManage SAS <contact@tomanage.fr>
@copyright 2014-2017 ToManage SAS
@license   http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
International Registered Trademark & Property of ToManage SAS
*/



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
    },
    {
        "desc": "Supprimer un ou des collaborateurs",
        "perm": {
            "delete": false
        }
    }
];

exports.menus = {
    "menu:HR": {
        "position": 90,
        "perms": "employee.read",
        "enabled": "$conf->bank->enabled",
        "usertype": 2,
        "title": "ManagementEmployees",
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