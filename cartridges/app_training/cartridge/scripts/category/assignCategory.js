var File = require('dw/io/File');
var XMLStreamWriter = require('dw/io/XMLStreamWriter');
var FileWriter = require('dw/io/FileWriter');
var Logger = require('dw/system/Logger');



function execute(parameters) {
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var CatalogMgr = require('dw/catalog/CatalogMgr');

    //Define the file path in the IMPEX/src folder
    var filePath =
        File.IMPEX +
        File.SEPARATOR +
        'src' +
        File.SEPARATOR +
        'xmlProducts.xml';

    //Create a new file in the specified path
    var file = new File(filePath);

    var fileWriter = new FileWriter(file);

    var xsw = new XMLStreamWriter(fileWriter);


    // Access the brand parameter
    var brand = parameters.brand;

    if (!brand) {
        // Handle case where brand parameter is missing
        return new Status(
            Status.ERROR,
            'NO_BRAND',
            'Brand parameter not found.'
        );
    }


    // Fetch the category from the specific catalog
    var targetCategory = CatalogMgr.getCategory('pencil-skirts');

    if (!targetCategory) {
        return new Status(
            Status.ERROR,
            'NO_CATEGORY',
            'Category pencil-skirts not found in the specified catalog.'
        );
    }



    // Initialize ProductSearchModel to find products by brand
    var productSearch = new ProductSearchModel();
    productSearch.setSearchPhrase(brand); // Using the brand as search criteria
    productSearch.search();

    var products = productSearch.getProductSearchHits();

    Logger.info(products);

    // Start writing to the XML file
    xsw.writeStartDocument();

    xsw.writeStartElement('catalog');
    xsw.writeAttribute(
        'xmlns',
        'http://www.demandware.com/xml/impex/catalog/2006-10-31'
    );
    xsw.writeAttribute('catalog-id', 'storefront-catalog-m-en');

    while (products.hasNext()) {
        var product = products.next().getProduct();

        xsw.writeStartElement('category-assignment');
        xsw.writeAttribute('category-id', targetCategory.getID()); 
        xsw.writeAttribute('product-id', product.getID());

        xsw.writeStartElement('primary-flag');
        xsw.writeCharacters('true');
        xsw.writeEndElement();

        xsw.writeEndElement(); 
    }

    xsw.writeEndElement(); 
    xsw.writeEndDocument();

    xsw.close();
    fileWriter.close();

    
}

module.exports = {
    execute: execute
};
