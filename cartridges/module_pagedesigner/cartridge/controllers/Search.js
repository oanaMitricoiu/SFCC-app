'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', (req, res, next) => {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var PageMgr = require('dw/experience/PageMgr');
    var category = CatalogMgr.getCategory('newarrivals');

    // Check if the category exists and has a custom attribute 'pageDesignerPageID'
    var pageDesignerID =
        category && 'pageDesignerPageID' in category.custom
            ? category.custom.pageDesignerPageID
            : null;

    // Retrieve the page designer page using the pageDesignerID
    var pageDesigner = pageDesignerID ? PageMgr.getPage(pageDesignerID) : null;

    // Check if the page designer page exists and is visible
    if (pageDesigner && pageDesigner.isVisible()) {
        return response.writer.println(PageMgr.renderPage(pageDesigner.ID, ''));
    }

    next();
});

module.exports = server.exports();
