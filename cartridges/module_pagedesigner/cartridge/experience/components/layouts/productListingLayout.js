'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var collections = require('app_storefront_base/cartridge/scripts/util/collections');
var ProductFactory = require('app_storefront_base/cartridge/scripts/factories/product');


/**
 * Render logic for the layouts.1column.
 */
module.exports.render = function (context) {
    var model =  new HashMap();
    var component = context.component;

    model.decorator = 'decoration/decorator';

    var content = context.content;

    model.content = content;
    model.category = context.content.category.getID();
    var products = context.content.category.getProducts().toArray().slice(0,4);

    var categoryProducts = products.map(product => {
       
        return ProductFactory.get({
            pview: 'tile',
            pid: product.getID(),
            ratings: true,
            swatches: true
        });
    })

   model.products = categoryProducts;
   model.display = { ratings: true, swatches: true };

   model.ids=context.content.product_ids.split(',');
     

    return new Template(
        'experience/components/layouts/productListingLayout'
    ).render(model).text;
};