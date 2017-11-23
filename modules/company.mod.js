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



exports.name = "societe";
exports.version = "1.00";
exports.enabled = true;

exports.csv = {
    "model": "Customers",
    "schema": "customerSchema",
    "aliases": {
        "fullName": "Client/Prospect/Fournisseur",
        "salesPurchases.ref": "Ref",
        "salesPurchases.salesPerson.fullName": "Commercial/Acheteur",
        "address.street": "Adresse",
        "address.zip": "Code postal",
        "address.city": "Ville",
        "companyInfo.idprof3": "Naf",
        "Status": "Etat",
        "entity": "Entite",
        "lastOrder": "Date derniere commande",
        "createdAt": "Date creation",
        "updatedAt": "Date modif"
    },
    "arrayKeys": {},
    "formatters": {
        "Date derniere commande": function(date) {
            return date ? moment(date).format(CONFIG('dateformatLong')) : 'X';
        },
        "Date creation": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },

        "Date modif": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },

        "Etat": function(Status) {
            const CustomerStatus = MODEL('Customers').Status;
            let result = MODULE('utils').Status(Status, CustomerStatus);
            return result.name;
        }
    }
};

exports.description = "Gestion des clients, contacts et fournisseurs";
exports.rights = [{
        "desc": "Lire les societes",
        "perm": {
            "read": true
        }
    },
    {
        "desc": "Creer modifier les societes",
        "perm": {
            "write": false
        }
    },
    {
        "desc": "Supprimer les societes",
        "perm": {
            "delete": false
        }
    },
    {
        "desc": "Exporter les societes",
        "perm": {
            "export": false
        }
    },
    {
        "desc": "Affecter des commerciaux",
        "perm": {
            "commercial": false
        }
    },
    {
        "desc": "Afficher les statistiques des ventes",
        "perm": {
            "stats": false
        }
    },
    {
        "desc": "Consulter tous les tiers par utilisateurs internes (sinon uniquement si contact commercial). Non effectif pour utilisateurs externes (tjs limités à eux-meme).",
        "perm": {
            "seeAll": false
        }
    },
    {
        "desc": "Modifier et gerer la segmentation",
        "perm": {
            "segmentation": false
        }
    },
    {
        "desc": "Modifier l'entité auquel est attaché le compte",
        "perm": {
            "entity": false
        }
    }
];
exports.menus = {
    "menu:organizations": {
        "position": 20,
        "perms": "societe.read",
        "enabled": "$conf->organizations->enabled",
        "usertype": 2,
        "icon": "fa-building-o",
        "title": "companies:ThirdParty",
        "submenus": {
            "menu:customers": {
                "position": 10,
                route: "societe.list",
                params: {
                    forSales: 1
                },
                "perms": "societe.read",
                "enabled": "$conf->societe->enabled",
                "usertype": 2,
                "title": "companies:ListCustomersShort",
                "fk_menu": "menu:companies",
                "icon": "fa-institution"
            },
            "menu:suppliers": {
                "position": 20,
                route: "societe.list",
                params: {
                    forSales: 0
                },
                "perms": "societe.read",
                "enabled": "$conf->societe->enabled",
                "usertype": 2,
                "title": "companies:ListOfSuppliersShort",
                "fk_menu": "menu:companies",
                "icon": "fa-institution"
            },
            "menu:contacts": {
                "position": 30,
                "url": "/erp/#!/contact?type=Person",
                "perms": "contact.read",
                "enabled": "$conf->societe->enabled",
                "usertype": 2,
                "title": "companies:ListOfContacts",
                "fk_menu": "menu:companies",
                "icon": "fa-users"
            },
            "menu:thirdpartystats": {
                "position": 80,
                "url": "/erp/#!/societe/stats",
                "perms": "societe.stats",
                "enabled": "$conf->societe->enabled",
                "usertype": 2,
                "title": "orders:BillsStatistics",
                "fk_menu": "menu:companies",
                "icon": "fa-institution"
            }
        }
    }
};
exports.filters = {
    "societe": {
        "Status": {
            "displayName": "Status",
            "backend": "Status",
            "type": "string"
        },
        "company": {
            "displayName": "Linked To",
            "backend": "company"
        },
        "type": {
            "displayName": "Type",
            "backend": "type",
            "type": "string"
        },
        "ref": {
            "displayName": "Ref",
            "backend": "salesPurchases.ref",
            "type": "string"
        },
        "entity": {
            "displayName": "Entity",
            "backend": "entity",
            "type": "string"
        },
        "lastOrder": {
            "type": "date",
            "backend": {
                "key": "lastOrder",
                "operator": ["$gte", "$lte"]
            }
        },
        "createdAt": {
            "type": "date",
            "backend": {
                "key": "createdAt",
                "operator": ["$gte", "$lte"]
            }
        },
        "salesPerson": {
            "displayName": "Assigned To",
            "backend": "salesPurchases.salesPerson"
        },
        "isProspect": {
            "type": "checked",
            "backend": "salesPurchases.isProspect",
            "options": {
                "values": [true, false]
            }
        },
        "isCustomer": {
            "type": "checked",
            "backend": "salesPurchases.isCustomer",
            "options": {
                "values": [true, false]
            }
        },
        "isSupplier": {
            "type": "checked",
            "backend": "salesPurchases.isSupplier",
            "options": {
                "values": [true, false]
            }
        },
        "isSubcontractor": {
            "type": "checked",
            "backend": "salesPurchases.isSubcontractor",
            "options": {
                "values": [true, false]
            }
        },
        "total_ttc": {
            "type": "number",
            "backend": {
                "key": "total_ttc",
                "operator": ["$gte", "$lte"]
            }
        }
    }
};