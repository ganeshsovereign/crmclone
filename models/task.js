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



"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var DataTable = require('mongoose-datatable');

DataTable.configure({
    verbose: false,
    debug: false
});
mongoose.plugin(DataTable.init);

var Dict = INCLUDE('dict');

var setDate = MODULE('utils').setDate;

/**
 * Article Schema
 */
var taskSchema = new Schema({
    name: String,
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    },
    datec: {
        type: Date,
        default: Date.now,
        set: setDate
    }, // date de creation
    datep: Date, // date de debut
    datef: Date, // date de fin
    duration: Number,
    type: String,
    entity: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    usertodo: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    userdone: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    description: {
        type: String
    },
    notes: [{
        _id: false,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        datec: {
            type: Date,
            default: Date.now
        },
        percentage: {
            type: Number,
            default: 0
        },
        class: Boolean, // To switch conversation left/right
        note: String
    }],
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    archived: {
        type: Boolean,
        default: false
    },
    group: {
        type: String,
        ref: 'group'
    },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

taskSchema.plugin(timestamps);

taskSchema.virtual('percentage')
    .get(function() {
        if (!this.notes || this.notes.length == 0)
            return 0;

        var last_note = this.notes[this.notes.length - 1];

        return last_note.percentage || 0;
    });

taskSchema.virtual('ended')
    .get(function() {
        if (!this.notes || this.notes.length == 0)
            return false;

        var last_note = this.notes[this.notes.length - 1];

        return last_note.percentage >= 100 || false;
    });

exports.Status = {
    "_id": "fk_task_status",
    "lang": "tasks",
    "values": {
        "TODO": {
            "enable": true,
            "label": "StatusActionToDo",
            "cssClass": "blue-gradient label-info",
            "dateEnd": "expired"
        },
        "ON": {
            "label": "StatusActionInProcess",
            "enable": true,
            "cssClass": "orange-gradient label-warning",
            "dateEnd": "expired"
        },
        "DONE": {
            "enable": true,
            "label": "StatusActionDone",
            "cssClass": "green-gradient label-success"
        },
        "NOTAPP": {
            "label": "StatusNotApplicable",
            "enable": false,
            "cssClass": "grey-gradient label-default"
        },
        "expired": {
            "enable": false,
            "label": "StatusActionTooLate",
            "cssClass": "red-gradient label-danger"
        }
    }
};

function getStatus(status) {
    return MODULE('utils').Status(status, exports.Status);
}

taskSchema.virtual('status')
    .get(function() {
        if ((!this.notes || this.notes.length == 0) && this.datef >= new Date)
            return getStatus("TODO");

        var percentage = 0;

        if (this.notes && this.notes.length) {
            var last_note = this.notes[this.notes.length - 1];
            percentage = last_note.percentage || 0;
        }

        if (percentage >= 100)
            return getStatus("DONE");

        if (this.datef < new Date)
            return getStatus("expired");

        if (percentage == 0)
            return getStatus("TODO");

        return getStatus("ON");

    });


var typeList = {};
Dict.dict({
    dictName: "fk_actioncomm",
    object: true
}, function(err, docs) {
    if (docs) {
        typeList = docs;
    }
});

taskSchema.virtual('_type')
    .get(function() {
        var _type = {};

        var type = this.type;

        if (type && typeList.values[type] && typeList.values[type].label) {
            _type.id = type;
            _type.name = i18n.t(typeList.lang + ":" + typeList.values[type].label);
        } else { // By default
            _type.id = type;
            _type.name = type;
        }

        return _type;
    });

taskSchema.pre('save', function(next) {
    var self = this;

    if (this.percentage != 100)
        this.userdone = {};

    next();
});

exports.Schema = mongoose.model('task', taskSchema, 'Task');
exports.name = "task";