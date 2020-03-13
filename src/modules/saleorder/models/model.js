'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SaleorderSchema = new Schema({
    customer_no: {
        type: String,
    },
    customer_name: {
        type: String,
    },
    doc_date: {
        type: String,
        required: 'Please fill a Saleorder doc_date',
    },
    contact_name: {
        type: String,
    },
    credit: {
        type: Number,
        required: 'Please fill a Saleorder credit',
    },
    order_no: {
        type: String,
    },
    order_date: {
        type: String,
    },
    delivery_date: {
        type: String,
        required: 'Please fill a Saleorder delivery_date',
    },
    items: {
        type: [
            {
                item_no: {
                    type: String,
                    required: 'Please fill a Saleorder item_no',
                },
                item_name: {
                    type: String,
                    required: 'Please fill a Saleorder item_name',
                },
                unitcount: {
                    type: String,
                    required: 'Please fill a Saleorder unitcount',
                },
                qty: {
                    type: Number,
                    required: 'Please fill a Saleorder qty',
                },
                unit_price: {
                    type: Number,
                    required: 'Please fill a Saleorder unit_price',
                },
                discount: {
                    type: Number,
                    required: 'Please fill a Saleorder discount',
                },
                tax: {
                    type: Number,
                    required: 'Please fill a Saleorder tax',
                },
                total_item: {
                    type: Number,
                    required: 'Please fill a Saleorder total_item',
                },
            }
        ],
        required: [true, 'Why no bacon?']
    },
    total: {
        type: {
            total_amount: {
                type: Number,
                required: 'Please fill a Saleorder total_amount',
            },
            discount: {
                type: Number,
                required: 'Please fill a Saleorder discount',
            },
            price_untax: {
                type: Number,
                required: 'Please fill a Saleorder price_untax',
            },
            tax: {
                type: Number,
                required: 'Please fill a Saleorder tax',
            },
            total_amount_tax: {
                type: Number,
                required: 'Please fill a Saleorder total_amount_tax',
            },
        }
    },




    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Saleorder", SaleorderSchema);