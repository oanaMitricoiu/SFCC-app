'use strict';

var server = require('server');
server.extend(module.superModule);


var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
// var webRef = webreferences2.Infovalutar
//             var port = webRef.getDefaultService() // Get the service port

var exchangeRateService = LocalServiceRegistry.createService(
    'mycartridge.http.converter.get',
    {
        initServiceClient: function (service) {
            // Initialize the SOAP service client
            var webRef = webreferences2.Infovalutar;
            var port = webRef.getDefaultService();
            return port;
        },
        createRequest: function (svc, param1) {
            var requestObject = new this.webReference.GetLatestValue();
            // requestObject.exchangeRate(param1);
            return requestObject;
        },
        execute: function (service, requestData) {
            // Additional processing or customization before the request
            return svc.serviceClient.GetLatestValue(requestObject);
        },
        parseResponse: function (svc, responseObject) {
            var responseWrapper = {};
            responseWrapper.exchangeRate =
                responseObject.GetLatestValue.exchangeRate;

            return responseWrapper;
        }
    }
);

server.append('Show', (req, res, next) => {
//    var currencyConverter = require('~/cartridge/scripts/currencyConverter');
    try {
            //  var exchangeRate = currencyConverter.getExchangeRate(1, "EURO", "RON");
                        var result = exchangeRateService.call({
                            amount: 1,
                            fromCurrency: "EURO",
                            toCurrency: "RON"
                        });

    } catch (error) {
        var a =  error
    }

    // var BasketMgr = require('dw/order/BasketMgr');
    // var currentBasket = BasketMgr.getCurrentBasket();

    // if (currentBasket) {
    //     var basketTotalEUR = currentBasket.getTotalGrossPrice().value;
    //     var basketTotalRON = basketTotalEUR * exchangeRate;

    //     res.render('cart/cart', {
    //         basketTotalEUR: basketTotalEUR,
    //         basketTotalRON: basketTotalRON
    //     });
    // }


    next();


});

module.exports = server.exports();
