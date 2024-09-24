'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', (req, res, next) => {
    const data = res.getViewData();

    const productHelper = require('*/cartridge/scripts/helpers/productHelpers');

    const calculatePercentageOffHelperResult =
        productHelper.calculatePercentageOff(data.product.price);

    const productModified = data.product;

    productModified.discountPercentage = calculatePercentageOffHelperResult;

    res.setViewData({
        product: productModified
    });

    next();
});

module.exports = server.exports();
