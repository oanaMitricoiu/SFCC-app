'use strict';

var base = require('app_storefront_base/cartridge/scripts/helpers/productHelpers');

/**
 * Calculates the percentage off between a standard price and a sale price.
 *
 * @param {number} standardPrice - The original price of the product.
 * @param {number} salePrice - The discounted price of the product.
 * @returns {number|null} The discount percentage, rounded to the nearest whole number, or null if no sale price is provided.
 *
 * @example
 * // returns 20
 * calculatePercentageOff(100, 80);
 *
 * @example
 * // returns null
 * calculatePercentageOff(100, null);
 */
function calculatePercentageOff(standardPrice, salePrice) {
    let discountPercentage = null;

    if (salePrice) {
        const discount = standardPrice - salePrice;
        discountPercentage = Math.round((discount / standardPrice) * 100);
    }

    return discountPercentage;
}

module.exports = Object.assign({}, base, {
    calculatePercentageOff: calculatePercentageOff
});
