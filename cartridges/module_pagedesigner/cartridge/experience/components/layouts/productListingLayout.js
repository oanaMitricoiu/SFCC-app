'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var collections = require('app_storefront_base/cartridge/scripts/util/collections');
var ProductFactory = require('app_storefront_base/cartridge/scripts/factories/product');
var ProductMgr = require('dw/catalog/ProductMgr');

module.exports.render = function (context) {
    var model = new HashMap();
    var products;

    model.decorator = 'decoration/decorator';

    function transformProduct(productArray) {
        var idProductsArray = productArray.map((product) => {
            return ProductFactory.get({
                pview: 'tile',
                pid: product.getID(),
                ratings: true,
                swatches: true
            });
        });

        return idProductsArray;
    }

    var productsFromCategory = context.content.category
        .getProducts()
        .toArray()
        .slice(0, 4);

    if (productsFromCategory && productsFromCategory.length > 0) {
        products = transformProduct(productsFromCategory);
    } else {
        ////Show products from ids
        var idsArray = context.content.product_ids.split(',');

        var idProducts = idsArray.reduce((accumulator,current) => {
            var product = ProductMgr.getProduct(current.trim());
            if (product && product.isOnline()) {
                accumulator.push(product);
            }
            return accumulator;
        }, []);

        products = transformProduct(idProducts);
    }

    model.products = products;

    model.display = { ratings: true, swatches: true };

    return new Template(
        'experience/components/layouts/productListingLayout'
    ).render(model).text;
};
