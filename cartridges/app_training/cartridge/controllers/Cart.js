'use strict';

var server = require('server');
var userLoggedIn = require('app_storefront_base/cartridge/scripts/middleware/userLoggedIn');
var ProductMgr = require('dw/catalog/ProductMgr');
server.extend(module.superModule);

server.append('AddProduct', (req, res, next) => {
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var Site = require('dw/system/Site');
    var emailHelpers = require('app_storefront_base/cartridge/scripts/helpers/emailHelpers');

    // Get the current customer's profile and email
    var currentCustomerProfile = req.currentCustomer.profile;
    if (!currentCustomerProfile) return next();

    var customerEmail = currentCustomerProfile.email;
    if(!customerEmail) return next();

    // Create the email object with recipient, subject, sender, and type
    var emailObj = {
        to: customerEmail,
        subject: 'Confirmation of Your Order',
        from:
            Site.current.getCustomPreferenceValue('customerServiceEmail') ||
            'no-reply@testorganization.com',
        type: 4
    };

    var productId = req.form.pid;
    if (!productId) return next();

    var product = ProductMgr.getProduct(productId);
    if (!product) return next();

    // Create an object with the product details
    var productDetails = {
        productId: product.ID,
        productName: product.name,
        productDescription: product.shortDescription
            ? product.shortDescription.markup
            : '',
        productImage: product.getImage('small', 0).getAbsURL().toString(),
        price: product.priceModel.price.value.toFixed(2),
        quantity: req.form.quantity
    };

    // Send an email with the product details using the emailHelpers module
    emailHelpers.sendEmail(
        emailObj,
        'cart/cartEmailNotification',
        productDetails
    );

    next();
});

module.exports = server.exports();
