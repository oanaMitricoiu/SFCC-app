'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('app_storefront_base/cartridge/experience/utilities/ImageTransformation.js');



module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.decorator = 'decoration/decorator';

   model.categoryName = content.categoryLink.getDisplayName();
   

    // Check if text_subline exists in the content
    model.text_headline = content.text_headline;
    if (content.text_subline) {
        model.text_subline = content.text_subline;
    }

    // Check if an image exists in the content
    if (content.image) {
        // If an image exists, create an image object in the model
        model.image = {
            // Create a src object with URLs for mobile and desktop devices
            src: {
                mobile: ImageTransformation.url(content.image, {
                    device: 'mobile'
                }),
                desktop: ImageTransformation.url(content.image, {
                    device: 'desktop'
                })
            },
            alt: content.image.file.getAlt(),
            // Calculate the focal point X position as a percentage
            focalPointX: content.image.focalPoint.x * 100 + '%',
            // Calculate the focal point Y position as a percentage
            focalPointY: content.image.focalPoint.y * 100 + '%'
        };
    }

   return new Template('experience/components/assets/wayfinderAsset').render(
        model
    ).text;
};
