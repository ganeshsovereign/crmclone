"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId,
    timestamps = require('mongoose-timestamp'),
    async = require('async'),
    _ = require('lodash');

var DataTable = require('mongoose-datatable');

DataTable.configure({
    verbose: false,
    debug: false
});
mongoose.plugin(DataTable.init);

var setPrice = MODULE('utils').setPrice;
var setDate = MODULE('utils').setDate;

var options = {
    collection: 'Payment',
    discriminatorKey: '_type',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};


var basePaymentSchema = new Schema({
    ID: Number,
    invoice: { type: ObjectId, ref: 'bill' },
    paidAmount: { type: Number, default: 0, set: setPrice },
    date: { type: Date, default: Date.now },
    name: { type: String, default: '', unique: true },
    workflow: { type: String, enum: ['Draft', 'Paid'], default: 'Paid' },
    differenceAmount: { type: Number, default: 0, set: setPrice },
    whoCanRW: { type: String, enum: ['owner', 'group', 'everyOne'], default: 'everyOne' },
    month: { type: Number },
    year: { type: Number },

    currency: {
        _id: { type: String, ref: 'currency', default: '' },
        rate: { type: Number, default: 1 }
    },

    groups: {
        owner: { type: ObjectId, ref: 'Users', default: null },
        users: [{ type: ObjectId, ref: 'Users', default: null }],
        group: [{ type: ObjectId, ref: 'Department', default: null }]
    },

    createdBy: { type: ObjectId, ref: 'Users', default: null },
    editedBy: { type: ObjectId, ref: 'Users', default: null },

    journal: { type: ObjectId, ref: 'journal', default: null },
    otherIncomeLossAccount: { type: ObjectId, ref: 'chartOfAccount', default: null }, // journal for other income/loss with different currency of invoice and payment
    bankAccount: { type: ObjectId, ref: 'chartOfAccount', default: null },

    bankExpenses: {
        amount: { type: Number, default: 0, set: setPrice },
        account: { type: ObjectId, ref: 'chartOfAccount', default: null }
    },

    overPayment: {
        amount: { type: Number, default: 0, set: setPrice },
        account: { type: ObjectId, ref: 'chartOfAccount', default: null }
    },

    otherIncomeLoss: {
        amount: { type: Number, default: 0, set: setPrice },
        account: { type: ObjectId, ref: 'chartOfAccount', default: null }
    },

    channel: { type: ObjectId, default: null, ref: 'integrations' },
    integrationId: { type: String, default: '' }
}, options);

basePaymentSchema.plugin(timestamps);

const PaymentBase = mongoose.model('payment', basePaymentSchema);

var PaymentSchema = new Schema({
    invoice: { type: ObjectId, ref: 'Invoice', default: null },
    forSale: { type: Boolean, default: true },
    paymentRef: { type: String, default: '' },
    supplier: { type: ObjectId, ref: 'Customers', default: null },
    paymentMethod: { type: ObjectId, ref: 'PaymentMethod', default: null },
    period: { type: ObjectId, ref: 'Destination', default: null },
    bonus: { type: Boolean },
    order: { type: ObjectId, ref: 'Order', default: null },
    currency: {
        _id: { type: String, ref: 'currency', default: null },
        rate: { type: Number, default: 1 }
    },

    channel: { type: ObjectId, ref: 'integrations', default: null },
    integrationId: { type: String, default: null },
    refund: { type: Boolean, default: false },
    refundId: { type: ObjectId, ref: 'Payment', default: null }
});

var InvoicePaymentSchema = new Schema({
    invoice: { type: ObjectId, ref: 'Invoice', default: null },
    forSale: { type: Boolean, default: true },
    paymentRef: { type: String, default: '' },
    supplier: { type: ObjectId, ref: 'Customers', default: null },
    paymentMethod: { type: ObjectId, ref: 'PaymentMethod', default: null },
    period: { type: ObjectId, ref: 'Destination', default: null },
    bonus: { type: Boolean },
    order: { type: ObjectId, ref: 'Order', default: null },
    currency: {
        _id: { type: String, ref: 'currency', default: null },
        rate: { type: Number, default: 1 }
    },

    channel: { type: ObjectId, ref: 'integrations', default: null },
    integrationId: { type: String, default: null },
    refund: { type: Boolean, default: false },
    refundId: { type: ObjectId, ref: 'Payment', default: null }
});

var ProformaPaymentSchema = new Schema({
    invoice: { type: ObjectId, ref: 'Invoice', default: null },
    forSale: { type: Boolean, default: true },
    paymentRef: { type: String, default: '' },
    supplier: { type: ObjectId, ref: 'Customers', default: null },
    paymentMethod: { type: ObjectId, ref: 'PaymentMethod', default: null },
    period: { type: ObjectId, ref: 'Destination', default: null },
    bonus: { type: Boolean },
    order: { type: ObjectId, ref: 'Order', default: null },
    currency: {
        _id: { type: String, ref: 'currency', default: null },
        rate: { type: Number, default: 1 }
    },

    channel: { type: ObjectId, ref: 'integrations', default: null },
    integrationId: { type: String, default: null },
    refund: { type: Boolean, default: false },
    refundId: { type: ObjectId, ref: 'Payment', default: null }
});

var ExpensesInvoicePaymentSchema = new Schema({
    invoice: { type: ObjectId, ref: 'Invoice', default: null },
    forSale: { type: Boolean, default: true },
    paymentRef: { type: String, default: '' },
    supplier: { type: ObjectId, ref: 'Customers', default: null },
    paymentMethod: { type: ObjectId, ref: 'PaymentMethod', default: null },
    period: { type: ObjectId, ref: 'Destination', default: null },
    bonus: { type: Boolean },
    order: { type: ObjectId, ref: 'Order', default: null },
    currency: {
        _id: { type: String, ref: 'currency', default: null },
        rate: { type: Number, default: 1 }
    },

    channel: { type: ObjectId, ref: 'integrations', default: null },
    integrationId: { type: String, default: null },
    refund: { type: Boolean, default: false },
    refundId: { type: ObjectId, ref: 'Payment', default: null }
});

var DividendInvoicePaymentSchema = new Schema({
    invoice: { type: ObjectId, ref: 'Invoice', default: null },
    forSale: { type: Boolean, default: true },
    paymentRef: { type: String, default: '' },
    supplier: { type: ObjectId, ref: 'Customers', default: null },
    paymentMethod: { type: ObjectId, ref: 'PaymentMethod', default: null },
    period: { type: ObjectId, ref: 'Destination', default: null },
    bonus: { type: Boolean },
    order: { type: ObjectId, ref: 'Order', default: null },
    currency: {
        _id: { type: String, ref: 'currency', default: null },
        rate: { type: Number, default: 1 }
    },

    channel: { type: ObjectId, ref: 'integrations', default: null },
    integrationId: { type: String, default: null },
    refund: { type: Boolean, default: false },
    refundId: { type: ObjectId, ref: 'Payment', default: null }
});

var purchasePaymentSchema = new Schema({
    forSale: { type: Boolean, default: false }
});

var PrepaymentSchema = new Schema({
    forSale: { type: Boolean, default: false }
});

var salaryPaymentSchema = new Schema({
    invoice: { type: ObjectId, ref: 'Invoice', default: null },
    isExpense: { type: Boolean, default: true },

    supplier: [{
        _id: { type: ObjectId, ref: 'Employees', default: null },
        name: { type: Object, default: null },
        paidAmount: Number,
        differenceAmount: { type: Number, default: 0, set: setPrice }
    }],

    paymentMethod: { type: ObjectId, ref: 'ProductCategory', default: null },
    paymentRef: [{ type: ObjectId, ref: 'PayRoll', default: null }], // ref to PayRoll
    period: { type: Date, default: null }
});

var payOutSchema = new Schema({
    forSale: { type: Boolean, default: false },
    supplier: { type: ObjectId, ref: 'Employees', default: null },
    paymentMethod: { type: ObjectId, ref: 'PaymentMethod', default: null },
    paymentRef: { type: String, default: '' },
    period: { type: Date, default: null }
});

const payment = PaymentBase.discriminator('Payment', PaymentSchema);
const prepayment = PaymentBase.discriminator('prepayment', PrepaymentSchema);
const purchasePayments = PaymentBase.discriminator('purchasePayments', purchasePaymentSchema);
const InvoicePayment = PaymentBase.discriminator('InvoicePayment', InvoicePaymentSchema);
const ProformaPayment = PaymentBase.discriminator('ProformaPayment', ProformaPaymentSchema);
const expensesInvoicePayment = PaymentBase.discriminator('expensesInvoicePayment', ExpensesInvoicePaymentSchema);
const dividendInvoicePayment = PaymentBase.discriminator('dividendInvoicePayment', DividendInvoicePaymentSchema);
const salaryPayment = PaymentBase.discriminator('salaryPayment', salaryPaymentSchema);
const wTrackPayOut = PaymentBase.discriminator('wTrackPayOut', payOutSchema);

exports.Schema = {
    payment: payment,
    prepayment: prepayment,
    purchasePayments: purchasePayments,
    InvoicePayment: InvoicePayment,
    ProformaPayment: ProformaPayment,
    expensesInvoicePayment: expensesInvoicePayment,
    dividendInvoicePayment: dividendInvoicePayment,
    salaryPayment: salaryPayment,
    wTrackPayOut: wTrackPayOut
};

exports.Schema = mongoose.model('payment', basePaymentSchema);
exports.name = "payment";