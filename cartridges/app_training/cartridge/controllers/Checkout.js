'use strict';

var Site = require('dw/system/Site');
var emailHelpers = require('app_storefront_base/cartridge/scripts/helpers/emailHelpers');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

var server = require('server');
server.extend(module.superModule);

// Define a GET route for subscribing to the newsletter
server.get('Subscribe', function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var myRedirectUrl = URLUtils.https('Home-Show').toString();

    res.render('subscribe/subscribe', {
        redirectUrl: myRedirectUrl
    });

    next();
});

// Define a POST route for submitting the subscription form
server.post('Submit', function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var Transaction = require('dw/system/Transaction');

    var form = req.form;

    var emailObj = {
        to: form.email,
        subject: 'Newsletter Sign Up',
        from:
            Site.current.getCustomPreferenceValue('customerServiceEmail') ||
            'no-reply@testorganization.com',
        type: 4
    };

    // Check if the email is already subscribed
    let newsletterDB = CustomObjectMgr.getCustomObject(
        'Newsletter',
        form.email
    );

    if (empty(newsletterDB)) {
        var newsletter;

        Transaction.wrap(function () {
            var Coupon = require('dw/campaign/Coupon');
            var Promotion = require('dw/campaign/PromotionMgr');

            // Create a new custom object for the newsletter subscription
            newsletter = CustomObjectMgr.createCustomObject(
                'Newsletter',
                form.email
            );

            var CampaignMgr = require('dw/campaign/CampaignMgr');

            // Retrieve the campaign by its ID
            var campaign = Promotion.getCampaign('Discount campaign');

            // Get all coupons from the campaign
            var coupons = Array.from(campaign.getCoupons());

            // Find the specific coupon by ID
            var discountCp = coupons.find((cp) => cp.ID == 'discountCoupon');

            // Assign the next available coupon code to the newsletter custom object
            newsletter.custom.coupon = discountCp.getNextCouponCode();

            var userDetails = {
                email: form.email,
                firstName: form.firstName,
                lastName: form.lastName,
                coupon: !empty(newsletter.custom.coupon)
                    ? newsletter.custom.coupon
                    : "Sorry, there aren't any available coupons anymore"
            };

            emailHelpers.sendEmail(emailObj, 'checkout/email', userDetails);
        });
    } else {
        var form = req.form;

        var userDetails = {
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            message: 'You have already subscribed to our newsletter'
        };

        // Send an error email indicating the user is already subscribed
        emailHelpers.sendEmail(
            emailObj,
            'checkout/subscribeError',
            userDetails
        );

        res.setStatusCode(400);
        res.json();

    }
        res.json();
        return next();
});

module.exports = server.exports();
