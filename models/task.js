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

/**
 * Article Schema
 */
var taskSchema = new Schema({
    name: String,
    societe: {id: Schema.Types.ObjectId, name: String},
    contact: {id: Schema.Types.ObjectId, name: String},
    datec: {type: Date, default: Date.now}, // date de creation
    datep: Date, // date de debut
    datef: Date, // date de fin
    duration: Number,
    type: String,
    entity: String,
    author: {id: String, name: String},
    usertodo: {id: String, name: String},
    userdone: {id: String, name: String},
    description: {type: String},
    notes: [
        {
            author: {
                id: {type: String, ref: 'User'},
                name: String
            },
            datec: {type: Date, default: Date.now},
            percentage: {type: Number, default: 0},
            class: Boolean, // To switch conversation left/right
            note: String
        }
    ],
    lead: {
        id: {type: Schema.Types.ObjectId, ref: 'Lead'},
        name: String
    },
    archived: {type: Boolean, default: false},
    group: {
        id: {type: String, ref: 'group'},
        name: String
    }
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

taskSchema.plugin(timestamps);

taskSchema.virtual('percentage')
        .get(function () {
            if (!this.notes || this.notes.length == 0)
                return 0;

            var last_note = this.notes[this.notes.length - 1];

            return last_note.percentage || 0;
        });

taskSchema.virtual('ended')
        .get(function () {
            if (!this.notes || this.notes.length == 0)
                return false;

            var last_note = this.notes[this.notes.length - 1];

            return last_note.percentage >= 100 || false;
        });

function getStatus(status) {
    var res_status = {};

    var taskStatus = {
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
    };

    if (status && taskStatus[status] && taskStatus[status].label) {
        //console.log(this);
        res_status.id = status;
        res_status.name = i18n.t("tasks:" + taskStatus[status].label);
        res_status.css = taskStatus[status].cssClass;
    } else { // By default
        res_status.id = status;
        res_status.name = status;
        res_status.css = "";
    }

    return res_status;

}

taskSchema.virtual('status')
        .get(function () {
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
Dict.dict({dictName: "fk_actioncomm", object: true}, function (err, docs) {
    if (docs) {
        typeList = docs;
    }
});

taskSchema.virtual('_type')
        .get(function () {
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

taskSchema.pre('save', function (next) {
    var self = this;

    if (this.percentage != 100)
        this.userdone = {};

    next();
});

exports.Schema = mongoose.model('task', taskSchema, 'Task');
exports.name = "task";
