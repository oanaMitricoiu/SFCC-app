'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', (req, res, next) => {
    var BasketMgr = require('dw/order/BasketMgr');
    var currentBasket = BasketMgr.getCurrentBasket();
    var Resource = require('dw/web/Resource');

    var cartTotal = currentBasket.totalGrossPrice.value;
    var cartTotalThreshold =
        dw.system.Site.getCurrent().getPreferences().custom.cartTotalThreshold;

    // Check if the current cart total exceeds the predefined threshold
    if (cartTotal > cartTotalThreshold) {
        // If it does, set an error message in the view data to inform the user
        res.setViewData({
            errorMessage: Resource.msg('error.exceeds.cart.total', 'cart', null)
        });
    }

    next();
});

module.exports = server.exports();
