'use strict';

var server = require('server');
var userLoggedIn = require('app_storefront_base/cartridge/scripts/middleware/userLoggedIn');
server.extend(module.superModule);

server.append('AddProduct', (req, res, next) => {
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var Resource = require('dw/web/Resource');
    var Site = require('dw/system/Site');
    var emailHelpers = require('app_storefront_base/cartridge/scripts/helpers/emailHelpers');
    var Template = require('dw/util/Template');
    var HashMap = require('dw/util/HashMap');

    var accountHelpers = require('app_storefront_base/cartridge/scripts/helpers/accountHelpers');
    var hooksHelper = require('app_storefront_base/cartridge/scripts/helpers/hooks');

    var currentCustomerProfile = req.currentCustomer.profile;
    var customerEmail = currentCustomerProfile.email;
    

    // var currentCustomer = CustomerMgr.getCustomerByCustomerNumber(
    //     customerLoginResult.customerNo
    // );
    // var customerProfile = currentCustomer.getProfile();
    // var customerEmail = customerProfile.getEmail();

    var emailObj = {
        to: customerEmail,
        subject: 'Hello',
        from:
            Site.current.getCustomPreferenceValue('customerServiceEmail') ||
            'no-reply@testorganization.com',
        type: 4
    };

    var customer = {
        name: "Oana",
        job:"programmer"
    }

    

    try {
        emailHelpers.sendEmail(
        emailObj,
        'cart/cartEmailNotification',
        customer,
        
    );

    }catch(error){
        var b = error
        console.log(b)
    }
    

    next();
});

module.exports = server.exports();
