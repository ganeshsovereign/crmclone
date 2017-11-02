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
    "collection": "Invoice",
    "schema": "Invoice",
    "aliases": {
        "forSales": "ForSales",
        "supplier.name": "Supplier Name",
        "sourceDocument": "Source Document",
        "supplierInvoiceNumber": "Supplier Invoice Number",
        "paymentReference": "Payment Reference",
        "invoiceDate": "Invoice Date",
        "dueDate": "Due Date",
        "paymentDate": "Payment Date",
        "account": "Account",
        "journal": "Journal",
        "salesPerson.name": "Salesperson Name",
        "paymentTerms": "Payment Term",
        "paymentInfo": "Payment Info",
        "payments": "Payment",
        "products": "Products",
        "workflow.name": "Workflow Name",
        "workflow.status": "Workflow Status",
        "whoCanRW": "Who Can RW",
        "groups.owner": "Groups Owner",
        "groups.users": "Groups Users",
        "groups.group": "Groups Group",
        "creationDate": "Creation Date",
        "createdBy.user": "Created By User",
        "createdBy.date": "Created By Date",
        "editedBy.user": "Edited By User",
        "editedBy.date": "Edited By Date"
    },

    "arrayKeys": {
        "groups.users": true,
        "groups.group": true
    },

    "formatters": {
        "Invoice Date": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },

        "Created Date": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        },

        "Edited Date": function(date) {
            return moment(date).format(CONFIG('dateformatLong'));
        }
    }
};