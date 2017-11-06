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

"use strcit";

const moment = require('moment');

exports.name = 'delivery';
exports.version = '1.00';

exports.enabled = true;

exports.csv = {
    "model": "order",
    "schema": "GoodsOutNote",
    "aliases": {
        "supplier.fullName": "Client",
        "ref": "Ref",
        "ref_client": "Ref_Client",
        "salesPerson.fullName": "Commercial",
        "datedl": "Date exp",
        "qty": "Qte",
        "Status": "Statut",
        "entity": "Entite",
        "status.isPrinted": "Impression",
        "status.isPicked": "Scanne",
        "status.isPacked": "Emballe",
        "status.isShipped": "Expedie",
        "status.printedBy": "Impression par",
        "status.pickedBy": "Scanne par",
        "status.packedBy": "Emballe par",
        "status.shippedBy": "Expedie par",
        "datec": "Date creation",
        "weight": "Poids"
            //"createdBy.user": "Created By User",
            //"createdBy.date": "Created By Date",
            //"editedBy.user": "Edited By User",
            //"editedBy.date": "Edited By Date"
    },

    "arrayKeys": {
        // "groups.users": true,
        // "groups.group": true
    },

    "formatters": {
        "Date exp": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },

        "Date creation": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },

        "Statut": function(Status) {
            const OrderStatus = MODEL('order').Status;

            let result = MODULE('utils').Status(Status, OrderStatus);
            return result.name;
        },
        "Impression": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },
        "Scanne": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },
        "Emballe": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },
        "Expedie": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        }
    }
};