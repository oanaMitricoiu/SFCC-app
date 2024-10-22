'use strict';

var server = require('server');
var flickrService = require('~/cartridge/scripts/services/FlickrService');

server.get('Show', function (req, res, next) {
    var result = flickrService.call({tags: 'landscape'}); // Call the service with the desired tags

    if (result.isOk()) {
        var responseData = result.object;
        res.render('flickr/flickrresults', {
            photos: responseData.photos.photo,
        });
    } else {
        res.render('flickr/error', {
            errorMessage: 'Error fetching data from Flickr.'
        });
    }

    next();
});

module.exports = server.exports();
