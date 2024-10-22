'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var FlickrService = LocalServiceRegistry.createService(
    'mycartridge.http.photos.get',
    {
        createRequest: function (service, params) {
            // Set the request method and URL for the API call
            service.setRequestMethod('GET');
            service.addHeader('Content-Type', 'application/json');
            var apiUrl =
                'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d2f8db2ccb097812009b2d449ef3607f&tags=' +
                params.tags +
                '&format=json&nojsoncallback=1';

            service.setURL(apiUrl);

            return params;
        },
        parseResponse: function (service, httpClient) {
            // Parse and return the JSON response
            if (httpClient.statusCode === 200) {
                 var response = JSON.parse(httpClient.text);
                 return response;
             } else {
                 throw new Error(
                     'API call failed: ' +
                         httpClient.statusCode +
                         ' - ' +
                         httpClient.statusText
                 );
             }
        }
    }
);

module.exports = FlickrService;
