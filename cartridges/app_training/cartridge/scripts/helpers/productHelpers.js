'use strict';

/**
 * Calculates the percentage off between the list price and the sales price.
 *
 * @param {Object} data - The data object containing price information.
 * @returns {number|null} The discount percentage rounded to the nearest integer, or null if the list or sales price is not provided.
 */

var base = require('app_storefront_base/cartridge/scripts/helpers/productHelpers');

function calculatePercentageOff(data) {
    if (!data.list || !data.sales) return null;

    const discount = data.list.value - data.sales.value;
    const discountPercentage = Math.round((discount / data.list.value) * 100);

    return discountPercentage;
}

module.exports = Object.assign({}, base, {
    calculatePercentageOff: calculatePercentageOff
});
