'use strict';

var server = require('server');
var ProductMgr = require('dw/catalog/ProductMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');

server.extend(module.superModule);

server.append('Show', (req, res, next) => {
    var ProductFactory = require('*/cartridge/scripts/factories/product');

    var productId = req.querystring.pid;
    if (!productId) return next();

    var product = ProductMgr.getProduct(productId);
    if (!product) return next();

    var primaryCategory = product.primaryCategory;
    if (!primaryCategory) return next();

    var categoryId = primaryCategory.ID;

    if (!categoryId) return next();

    var productSearchModel = new ProductSearchModel();
    productSearchModel.setCategoryID(categoryId);

    productSearchModel.search();

    var searchHits = productSearchModel.getProductSearchHits();
    var productsInCategory = [];
    var count=0;

    while (searchHits.hasNext()) {
        var searchHit = searchHits.next();
        var productInCategory = searchHit.getProduct();

        var product = ProductFactory.get({
            pview: 'tile',
            pid: productInCategory.ID,
            ratings: true,
            swatches: true
        });

        if (product.id != productId) {
            if(count == 4) break;
            productsInCategory.push(product);
            count++;
        }
    }

    res.setViewData({
        productsInCategory: productsInCategory,
        display: { ratings: true, swatches: true }
    });

    next();
});

module.exports = server.exports();
