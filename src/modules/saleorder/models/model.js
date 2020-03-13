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
    status: {
        type: String,
        default:'open',
    },
    doc_no: {
        type: String,
        unique: true,
        // default: '000'
    },
    doc_date: {
        type: Date,
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
        type: Date,
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

SaleorderSchema.pre("save", function (next) {
    const model = mongoose.model("Saleorder", SaleorderSchema);
    let saleorder = this;

    saleorder.total.total_amount = 0;
    saleorder.total.tax = 0;
    saleorder.items.forEach(function (item) {
        saleorder.total.total_amount += (item.qty * item.unit_price) - item.discount;
        saleorder.total.tax += (item.qty * item.unit_price) * (item.tax / 100);
    })

    saleorder.total.price_untax = saleorder.total.total_amount - saleorder.total.discount;
    saleorder.total.total_amount_tax = saleorder.total.price_untax + saleorder.total.tax;



    if (saleorder.isNew) {
        // console.log(new Date(saleorder.doc_date.getFullYear(), saleorder.doc_date.getMonth(), 1));
        // console.log(new Date(saleorder.doc_date.getFullYear(), saleorder.doc_date.getMonth() + 1, 1));
        model.find({ doc_date: { $gte: new Date(saleorder.doc_date.getFullYear(), saleorder.doc_date.getMonth(), 1), $lte: new Date(saleorder.doc_date.getFullYear(), saleorder.doc_date.getMonth() + 1, 1) } }, function (err, res) {
            if (err) {
                next(err);
            }
            if (res.length === 0) {
                // saleorder.doc_no = saleorder.doc_date.getFullYear().toString() + (saleorder.doc_date.getMonth() + 1).toString() + "001";
                saleorder.doc_no = `${saleorder.doc_date.getFullYear()}-${(saleorder.doc_date.getMonth() + 1).toString().padStart(2, "0")}-001`
                // console.log(saleorder);
            } else {
                const maxno = res.length;
                saleorder.doc_no = `${saleorder.doc_date.getFullYear()}-${(saleorder.doc_date.getMonth() + 1).toString().padStart(2, "0")}-${(maxno+1).toString().padStart(3, "0")}`
            }

            next();
        })

    } else {
        next();
    }


})

mongoose.model("Saleorder", SaleorderSchema);