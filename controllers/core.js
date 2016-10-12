"use strict";

var _ = require('lodash');

var Dict = INCLUDE('dict');


exports.install = function () {
    F.route('/erp/api/dict', load_dict, ['authorize']);
    F.route('/erp/api/extrafield', load_extrafield, ['authorize']);
    F.route('/erp/api/sendEmail', sendEmail, ['post', 'json', 'authorize']);
    F.route('/erp/api/task/count', task_count, ['authorize']);

    F.route('/erp/api/product/convert_price', function () {
        var ProductModel = MODEL('product').Schema;
        var PriceLevelModel = MODEL('pricelevel').Schema;

        if (this.query.type) {
            ProductModel.find({}, function (err, docs) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    ProductModel.update({_id: docs[i]._id}, {'type': 'PRODUCT'}, function (err, doc) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }

        if (this.query.price) {
            ProductModel.find({}, function (err, docs) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    ProductModel.update({_id: docs[i]._id}, {'prices.pu_ht': docs[i].pu_ht}, function (err, doc) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }
        if (this.query.pricelevel) {
            PriceLevelModel.find({}, function (err, docs) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    PriceLevelModel.update({_id: docs[i]._id}, {'prices.pu_ht': docs[i].pu_ht}, function (err, doc) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }

        this.json({ok: true});
    }, ['authorize']);
    F.route('/erp/api/product/convert_tva', function () {
        DictModel.findOne({
            _id: "dict:fk_tva"
        }, function (err, docs) {
            for (var i in docs.values) {
                if (docs.values[i].label)
                    docs.values[i].value = docs.values[i].label;
                if (docs.values[i].label == null && docs.values[i].value == null)
                    docs.values[i].value = 0;
                delete docs.values[i].label;
                //console.log(docs.values[i]);
            }
            docs.save(function (err, doc) {
                //console.log(err);
                res.json(doc);
            });
        });
    }, ['authorize']);
    F.route('/erp/convert/resource', convert_resource, ['authorize']);
    F.route('/erp/convert/{type}', convert, ['authorize']);


    // SHOW LAST 50 PROBLEMS
    F.route('/erp/errors/', function () {

        var self = this;
        self.json(F.problems);

    });

    //F.route('#404', view_404);
    //F.route('#500', view_500);
};

function load_dict() {
    var self = this;

    Dict.dict(self.query, function (err, dict) {
        if (err)
            return self.throw500(err);

        self.json(dict);
    });
}

function load_extrafield() {
    var self = this;

    Dict.extrafield(self.query, function (err, extrafield) {
        if (err)
            return self.throw500(err);

        self.json(extrafield);
    });
}

function view_404() {
    console.log("Error 404 : not found", this.url);
    self.theme(null);
    this.view('404');
}

function view_500() {
    self.theme(null);
    this.view('500');
}

function sendEmail() {
    var self = this;

    //console.log(self.body);

    var mailOptions = self.body.message;

    if (self.body.data && self.body.data.url)
        self.body.data.url = self.host(self.body.data.url);

    if (self.body.data && !self.body.data.entity)
        self.body.data.entity = self.entity._id;

    //console.log(self.body);

    self.body.data.entity = self.body.data.entity.charAt(0).toUpperCase() + self.body.data.entity.slice(1);

    var dest = [];
    if (typeof self.body.to == 'object' && self.body.to.length)
        dest = _.pluck(self.body.to, 'email');
    else
        dest = self.body.to;

    if (!dest || !dest.length)
        return self.throw500('No destinataire');

    console.log(dest);

    //Send an email
    self.mail(dest, self.body.data.entity + " - " + self.body.data.title, self.body.ModelEmail, self.body.data);

    if (self.config['mail.address.copy'])
        self.mail(self.config['mail.address.copy'], self.entity.name + " - " + self.body.data.title, self.body.ModelEmail, self.body.data);

    self.json({
        successNotify: {
            title: "Mail envoye",
            message: self.body.to.length + " mail(s) envoye(s)"
        }
    });
}

function task_count() {
    var TaskModel = MODEL('task').Schema;
    var self = this;
    var params = self.query;
    var query = {};

    /*if (params.filters) {
     if (params.filters.filters) {
     var list = [];
     for (var i = 0; i < params.filters.filters.length; i++)
     list.push(params.filters.filters[i].value);
     query['usertodo.id'] = {'$in': list};
     } else {
     return res.send(200, []);
     }
     }*/

    var result = [];

    switch (params.query) {
        case 'MYTASK':
            query.$or = [
                {'usertodo.id': params.user, 'userdone.id': null},
                {'author.id': params.user, archived: false}
            ];
            break;
        case 'ALLTASK':
            query.$or = [
                {'usertodo.id': params.user, 'userdone.id': null},
                {'author.id': params.user, archived: false},
                {entity: params.entity, archived: false}
            ];
            break;
        case 'MYARCHIVED':
            query.$or = [
                {'usertodo.id': params.user, 'userdone.id': {$ne: null}},
                {'author.id': params.user, archived: true}];
            break;
        case 'ARCHIVED':
            query.$or = [
                {'usertodo.id': params.user, 'userdone.id': {$ne: null}},
                {'author.id': params.user, archived: true},
                {entity: params.entity, archived: true}
            ];
            break;
        default: //'ARCHIVED':
            query.archived = true;
    }

    TaskModel.count(query, function (err, count) {
        self.json({count: count});
    });
}

function convert(type) {
    /**
     * Convert contact collection to new user schema extended for e-commerce
     */

    var self = this;
    var mongoose = require('mongoose');

    console.log(type);

    if (type == 'user') {
        var UserModel = MODEL('hr').Schema;

        mongoose.connection.db.collection('users', function (err, collection) {
            collection.find({_type: null}, function (err, users) {
                if (err)
                    return console.log(err);

                users.each(function (err, user) {

                    if (user == null)
                        return self.plain("Converted Users...");


                    user.username = user.name;
                    var id = user._id;
                    delete user._id;
                    delete user.name;

                    if (user.Status !== 'ENABLE')
                        delete user.password;

                    //console.log(user);

                    var newUser = new UserModel(user);
                    //console.log(newUser);
                    collection.deleteOne({_id: id}, function (err, results) {
                        if (err)
                            return console.log(err);

                        newUser.save(function (err, doc) {
                            if (err || !doc)
                                return console.log("Impossible de creer ", err);
                        });

                    });

                });

            });
        });

        return;
    }

    if (type == 'contact') {
        var UserModel = MODEL('contact').Schema;
        mongoose.connection.db.collection('users', function (err, collection) {
            collection.find({}, function (err, users) {
                users.each(function (err, user) {
                    if (user.societe && user.societe.id)
                        UserModel.update({_id: user._id}, {$set: {societe: user.societe.id}}, {upsert: false, multi: false}, function (err, result) {
                            console.log(err, result);
                        });
                });
            });
        });

        return;

        mongoose.connection.db.collection('Contact', function (err, collection) {
            collection.find({}, function (err, contacts) {
                if (err)
                    return console.log(err);

                contacts.each(function (err, contact) {


                    if (contact == null)
                        return self.plain("Converted contacts...");

                    var id = contact._id;
                    if (!contact.email)
                        delete contact.email;

                    if (contact.Status == 'ST_ENABLE')
                        contact.Status = 'ENABLE';
                    else if (contact.Status == 'ST_DISABLE')
                        contact.Status = 'DISABLE';
                    else
                        contact.Status = 'NEVER';

                    //console.log(contact);

                    var newUser = new UserModel(contact);
                    //console.log(contact);

                    newUser.save(function (err, doc) {
                        if (err || !doc)
                            return console.log("Impossible de creer ", err)
                    });

                });
            });
            collection.remove(function (err) {
                if (err)
                    console.log(err);
            });
        });

        return;
    }

    return self.plain("Type is unknown");
}

function convert_resource() {
    var self = this;

    //phase 1. lire le fichier fr/admin.json lire:require afficher un json
    //pahse 2. ecrire ton premier sublime
    //phase 3. ecrire le premier fichier -> stream
    //phase 4. convertir le json en sublime
    //pahse 5. faire automatique tous les fichiers du repertoire fr
    // Bon courage...

    //self.plain('Coucou');//text
    self.json({coucou:true});//afficher un json

}

// TODO a supprimer cette function
function downloadEntries(journal) {
    var self = this;

    var fixedWidthString = require('fixed-width-string');
    var BillModel = MODEL('bill').Schema;
    var BillSupplierModel = MODEL('billSupplier').Schema;

    var Book = INCLUDE('accounting').Book;
    var myBook = new Book();
    myBook.setEntity(self.query.entity);
    myBook.setName(journal);

    //console.log(self.query);

    var query = self.query;

    var Stream = require('stream');
    var stream = new Stream();

    var dateStart = moment(query.start_date).startOf('day').toDate();

    var mode = 'csv';
    var extension = 'csv';

    if (self.query.mode) {
        mode = self.query.mode;
        delete self.query.mode;
    }

    if (mode === 'quadratus')
        extension = 'txt';


    myBook.ledger(query).then(function (res) {
        // console.log(res);

        var out = "";

        if (mode === 'csv') {
            //entete
            out += "DTOPE;NUMJL;NUMCP;NPIEC;LIBEC;MTDEB;MTCRE;MONNAIE_IDENT;LETRA;DATECH;PERIDEB;PERIFIN;RAPPRO\n";
            stream.emit('data', out);
        }

        var debit = 0;
        var credit = 0;

        async.eachSeries(res.results, function (entry, cb) {

            if (entry.exported)
                return cb(null);//Already exported

            async.waterfall([
                function (cb) {
                    if (entry.meta && entry.meta.billId)
                        return BillModel.findOne({_id: entry.meta.billId}, "dater dateOf dateTo", function (err, bill) {
                            if (!bill)
                                return cb(null, {dater: null, dateOf: null, dateTo: null});

                            cb(null, {dater: bill.dater, dateOf: bill.dateOf, dateTo: bill.dateTo});
                        });

                    cb(null, {dater: null, dateOf: null, dateTo: null});
                },
                function (dates, cb) {
                    if (entry.meta && entry.meta.billId)
                        return BillSupplierModel.findOne({_id: entry.meta.billId}, "dater dateOf dateTo", function (err, bill) {
                            if (!bill)
                                return cb(null, dates);

                            cb(null, {dater: bill.dater, dateOf: bill.dateOf, dateTo: bill.dateTo});
                        });

                    if (entry.meta && entry.meta.billSupplierId)
                        return BillSupplierModel.findOne({_id: entry.meta.billSupplierId}, "dater dateOf dateTo", function (err, bill) {
                            if (!bill)
                                return cb(null, dates);

                            cb(null, {dater: bill.dater, dateOf: bill.dateOf, dateTo: bill.dateTo});
                        });

                    cb(null, dates);
                }
            ],
                    function (err, result) {

                        if (result.dater == null)
                            result.dater = "";

                        if (result.dateOf == null)
                            result.dateOf = "";

                        if (result.dateTo == null)
                            result.dateTo = "";

                        var out = "";

                        if (mode === 'quadratus') {
                            out += 'M';

                            // rename accounts
                            entry.accounts = entry.accounts.replace(/^401/, "0");
                            entry.accounts = entry.accounts.replace(/^411/, "9");

                            var account = fixedWidthString(entry.accounts, 9, {ellipsis: '.'});
                            out += account.substr(0, 8);
                            //if ((CONFIG('accounting.' + entry.book) || entry.book).length > 2)
                            //    return cb('accounting journal length > 2!');

                            out += fixedWidthString(CONFIG('accounting.' + entry.book) || entry.book, 2);
                            out += '000'; //Folio
                            out += dateFormat(entry.datetime, "ddmmyy");
                            out += " "; //Filler
                            out += fixedWidthString(entry.memo, 20, {ellipsis: '.'});
                            if (entry.credit) {
                                out += 'C';
                                out += "+";//signe + ou -
                                out += fixedWidthString(round(entry.credit * 100, 0), 12, {padding: '0', align: 'right'});
                            } else {
                                out += 'D';
                                out += "+";//signe + ou -
                                out += fixedWidthString(round(entry.debit * 100, 0), 12, {padding: '0', align: 'right'});
                            }
                            //if (entry.reconcilliation)
                            //    out += fixedWidthString("R" + moment(entry.reconcilliation).format("MMYY"), 8);
                            //else
                            out += fixedWidthString("", 8);//contrepartie
                            if (journal == 'VTE' || journal == 'ACH')
                                out += (result.dater ? dateFormat(result.dater, "ddmmyy") : fixedWidthString("", 6));//date echeance
                            else
                                out += fixedWidthString("", 6);
                            out += fixedWidthString("", 5); // Lettrage
                            out += fixedWidthString("", 5); // Numero de piece UNUSED
                            out += fixedWidthString("", 19);  //Filler

                            if (entry.reconcilliation)
                                entry.seq = (entry.seq ? entry.seq : "") + "-" + moment(entry.reconcilliation).format("MM");

                            out += fixedWidthString((entry.seq ? entry.seq : ""), 8, {align: 'right'}); // Numero de piece
                            out += " "; //Filler
                            out += "EUR";
                            out += fixedWidthString("", 3); // UNUSED
                            out += fixedWidthString("", 3);  //Filler
                            out += fixedWidthString(entry.memo, 32, {ellipsis: '.'});
                            out += fixedWidthString((entry.seq ? entry.seq : ""), 10); // Numero de piece
                            out += fixedWidthString("", 73);  //Filler

                            if (journal == 'VTE' || journal == 'ACH')
                                if (result.dateOf || result.dateTo) {
                                    out += "\n";
                                    out += "Y;";
                                    if (result.dateOf) {
                                        out += "PeriodiciteDebut=";
                                        out += dateFormat(result.dateOf, "dd/mm/yy");//date debut periode
                                        out += ";";
                                    }
                                    if (result.dateTo) {
                                        out += "PeriodiciteFin=";
                                        out += dateFormat(result.dateTo, "dd/mm/yy");//date fin periode
                                        out += ";";
                                    }
                                }


                            debit += round(entry.debit, 2);
                            credit += round(entry.credit, 2);
                        }

                        out += "\n";

                        stream.emit('data', out); //ecriture dans le fichier
                        cb(null);
                    });



        }, function (err) {
            if (err)
                return console.log(err);

            console.log("Debit : " + debit);
            console.log("Credit : " + credit);

            stream.emit('end');
        });

    });

    self.stream('application/text', stream, journal + '_' + dateStart.getFullYear().toString() + "_" + (dateStart.getMonth() + 1).toString() + "." + extension);

}