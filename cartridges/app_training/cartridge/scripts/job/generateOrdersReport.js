'use strict';

var OrderMgr = require('dw/order/OrderMgr');
var Logger = require('dw/system/Logger');

var File = require('dw/io/File');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var FileWriter = require('dw/io/FileWriter');

function execute() {
    // Define the file path in the IMPEX/src folder
    var filePath =
        File.IMPEX +
        File.SEPARATOR +
        'src' +
        File.SEPARATOR +
        'orders.csv';


    // Create a new file in the specified path
    var file = new File(filePath);

    var fileWriter = new FileWriter(file);
    var csvWriter = new CSVStreamWriter(fileWriter);


            // Write CSV headers
            csvWriter.writeNext([
                'Order No',
                'Customer Email',
                'Order Date',
                'Total Amount',
                'Status'
            ]);

            // Retrieve all orders placed by customers
            var orderIterator = OrderMgr.searchOrders(
                'customerNo != NULL',
                'creationDate DESC'
            );

            // Write each order's information to the CSV file
            while (orderIterator.hasNext()) {
                var order = orderIterator.next();
                var orderNo = order.orderNo;
                var customerEmail = order.customerEmail || 'Guest';
                var orderDate = order.creationDate.toISOString();
                var totalAmount = order.totalGrossPrice.value;
                var status = order.status.toString();

                // Write the order data to the CSV file
                csvWriter.writeNext([
                    orderNo,
                    customerEmail,
                    orderDate,
                    totalAmount,
                    status
                ]);
            }

    // Close the writers
    csvWriter.close();
    fileWriter.close();

}

    module.exports = {
        execute: execute
    };





