'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('app_storefront_base/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.1column.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

     model.decorator = 'decoration/decorator';

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/layouts/wayfinderLayout').render(model)
        .text;
};

