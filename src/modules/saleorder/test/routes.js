'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Saleorder = mongoose.model('Saleorder');

var credentials,
    token,
    mockup;

describe('Saleorder CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            customer_no: 'cus170317-001',
            customer_name: 'จูเนียร์',
            doc_date: '2563-03-11',
            contact_name: 'นาย กอ ขอ',
            credit: 10,
            order_no: 'po230317-001',
            order_date: '2564-03-12',
            delivery_date: '2564-03-12',
            items: [
                {
                    item_no: '112234',
                    item_name: 'แมนเดย์',
                    unitcount: 'แมน',
                    qty: 100,
                    unit_price: 200,
                    discount: 10,
                    tax: 5,
                    total_item: 19990
                }
            ],
            total: {
                // total_amount: 21000,
                discount: 1000,
                // price_untax: 21000,
                // tax: 1000,
                // total_amount_tax: 21000
            }
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Saleorder get use token', (done) => {
        request(app)
            .get('/api/saleorders')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Saleorder get by id', function (done) {

        request(app)
            .post('/api/saleorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/saleorders/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        // console.log(resp.data);

                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.doc_no, "2563-03-001");
                        assert.equal(resp.data.customer_no, mockup.customer_no);
                        assert.equal(resp.data.customer_name, mockup.customer_name);
                        // assert.equal(resp.data.doc_date, mockup.doc_date);
                        assert.equal(resp.data.contact_name, mockup.contact_name);
                        assert.equal(resp.data.credit, mockup.credit);
                        assert.equal(resp.data.order_no, mockup.order_no);
                        // assert.equal(resp.data.order_date, mockup.order_date);
                        assert.equal(resp.data.delivery_date, mockup.delivery_date);
                        assert.equal(resp.data.items[0].item_no, mockup.items[0].item_no);
                        assert.equal(resp.data.items[0].item_name, mockup.items[0].item_name);
                        assert.equal(resp.data.items[0].unitcount, mockup.items[0].unitcount);
                        assert.equal(resp.data.items[0].qty, mockup.items[0].qty);
                        assert.equal(resp.data.items[0].unit_price, mockup.items[0].unit_price);
                        assert.equal(resp.data.items[0].discount, mockup.items[0].discount);
                        assert.equal(resp.data.items[0].tax, mockup.items[0].tax);
                        assert.equal(resp.data.items[0].total_item, mockup.items[0].total_item);
                        assert.equal(resp.data.total.total_amount, 19990);
                        assert.equal(resp.data.total.discount, 1000);
                        assert.equal(resp.data.total.price_untax, 18990);
                        assert.equal(resp.data.total.tax, 1000);
                        assert.equal(resp.data.total.total_amount_tax, 19990);
                        done();
                    });
            });

    });

    it('should be Saleorder post use token', (done) => {
        request(app)
            .post('/api/saleorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                // console.log(resp.data);
                assert.equal(resp.data.customer_no, mockup.customer_no);
                assert.equal(resp.data.customer_name, mockup.customer_name);
                assert.equal(resp.data.doc_no, "2563-03-001");
                // assert.equal(resp.data.doc_date, mockup.doc_date);
                assert.equal(resp.data.contact_name, mockup.contact_name);
                assert.equal(resp.data.credit, mockup.credit);
                assert.equal(resp.data.order_no, mockup.order_no);
                // assert.equal(resp.data.order_date, mockup.order_date);
                assert.equal(resp.data.delivery_date, mockup.delivery_date);
                assert.equal(resp.data.items[0].item_no, mockup.items[0].item_no);
                assert.equal(resp.data.items[0].item_name, mockup.items[0].item_name);
                assert.equal(resp.data.items[0].unitcount, mockup.items[0].unitcount);
                assert.equal(resp.data.items[0].qty, mockup.items[0].qty);
                assert.equal(resp.data.items[0].unit_price, mockup.items[0].unit_price);
                assert.equal(resp.data.items[0].discount, mockup.items[0].discount);
                assert.equal(resp.data.items[0].tax, mockup.items[0].tax);
                assert.equal(resp.data.items[0].total_item, mockup.items[0].total_item);
                assert.equal(resp.data.total.total_amount, 19990);
                assert.equal(resp.data.total.discount, 1000);
                assert.equal(resp.data.total.price_untax, 18990);
                assert.equal(resp.data.total.tax, 1000);
                assert.equal(resp.data.total.total_amount_tax, 19990);
                done();
            });
    });

    it('should be saleorder put use token', function (done) {

        request(app)
            .post('/api/saleorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    order_no: 'po230317-002',
                }
                request(app)
                    .put('/api/saleorders/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        // console.log(resp.data);
                        assert.equal(resp.data.order_no, update.order_no);
                        done();
                    });
            });

    });

    it('should be saleorder delete use token', function (done) {

        request(app)
            .post('/api/saleorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/saleorders/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be saleorder get not use token', (done) => {
        request(app)
            .get('/api/saleorders')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be saleorder post not use token', function (done) {

        request(app)
            .post('/api/saleorders')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be saleorder put not use token', function (done) {

        request(app)
            .post('/api/saleorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/saleorders/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be saleorder delete not use token', function (done) {

        request(app)
            .post('/api/saleorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/saleorders/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Saleorder.deleteMany().exec(done);
    });

});