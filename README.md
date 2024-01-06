# NetSuite QR Code Generator
Simple SDF project that demonstrates how to generate & render server side generated QR code within NetSuite.

![App Screenshot](screenshots/netsuite_qr_code.png)

## Usage
- In NetSuiteQRCodeGenerator_UE, getData function:

  - Remove comment if you want to generate QR code for the transaction URL:
    - ``return resolveRecordUrl(newRecord.type, newRecord.id);``
  - Remove comment if you want to generate QR code for the transaction id:
    - ``return newRecord.getValue({fieldId: 'tranid'});``
  - Remove comment if you Want to generate QR code for the memo field value (default):
    - ``return newRecord.getValue({fieldId: 'memo'});``
  - Want to customize more? Just write your code in getData():
    - ``return "Here is my barcode!"``
- How to make QR code bigger?
  - Increase value of CELL_SIZE in NetSuiteQRCodeGenerator_UE

## Credits
- QR Code Generator for JavaScript (http://www.d-project.com/)

## Screenshots
![App Screenshot](screenshots/screenshot2.png)
![App Screenshot](screenshots/screenshot1.png)
