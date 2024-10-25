'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('GetContent', (req, res, next) => {
   'use strict';

   var server = require('server');
   var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
   

   server.get('Show', function (req, res, next) {
       // Create OCAPI Service
       var ocapiService = LocalServiceRegistry.createService('ocapiService', {
           createRequest: function (svc) {
               svc.setRequestMethod('GET');
               svc.addHeader('Authorization', 'Bearer ' + getAccessToken());
               svc.setURL(
                   'https://zzrb-130.dx.commercecloud.salesforce.com/on/demandware.store/Sites-Site/default/dw/data/v20_4/products?brand=Sony&category=electronics&count=20'
               );
           },
           parseResponse: function (svc, client) {
               return client.text;
           }
       });

       // Call the OCAPI service
       var result = ocapiService.call();

       // Check if the result was successful
       if (result.isOk()) {
           var products = JSON.parse(result.object); // Parse the JSON response

           // Render the ISML template with the product data
          res.render('ocapiProducts', {
               products: products
           });
       } else {
           // Handle error cases
           console.log(result.errorMessage);
       }

       next();
   });
});

module.exports = server.exports();
