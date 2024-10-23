'use strict';

// var webref = webreferences2.Infovalutar;
// var port = webref.getDefaultService();

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
            requestObject.exchangeRate(param1);
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

module.exports = {
    getExchangeRate: function (amount, fromCurrency, toCurrency) {
        try {
            var result = currencyConverterService.call({
                amount: amount,
                fromCurrency: fromCurrency,
                toCurrency: toCurrency
            });
            if (result.isOk()) {
                return result.object;
            } else {
                throw new Error('Service call failed');
            }
        } catch (e) {
            throw new Error('Error: ' + e.message);
        }
    }
};

//  getExchangeRate: function () {

// var response = port.GetLatestValue({
//                 Moneda: 'EUR' // Pass the required parameter (currency in this case)
//             });
//             dw.system.Logger.error('SOAP service call failed: ' + webref);

//             // Extract the response (adjust to match the WSDL response structure)
//             return response.GetLatestValueResult; // Adjust based on the actual response structure

// }
