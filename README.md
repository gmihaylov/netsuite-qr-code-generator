# NetSuite QR Code Generator
Simple SDF project that demonstrates how to create & render server side generated QR code within NetSuite.

## Example:
![App Screenshot](screenshots/netsuite_qr_code.png)

## Deployment
- NetSuiteQRCodeGenerator_UE is deployed on the Sales Order record, but can be deployed on any other transaction or/and custom record.
- The QR code is generated on beforeLoad (scriptContext.UserEventType.VIEW) and rendered in the INLINEHTML field.
- QR code is generated on-the-fly, at the server side
- QR code can show any data you want (this can be customized in getData() function)
- NetSuiteQRCodeGenerator_SL just show how to implement the QR code in Suitelets

## Usage
- In NetSuiteQRCodeGenerator_UE, getData function:

  - Remove comment if you want to generate QR code for the transaction URL:
    - ``return resolveRecordUrl(newRecord.type, newRecord.id);``
  - Remove comment if you want to generate QR code for the transaction id:
    - ``return newRecord.getValue({fieldId: 'tranid'});``
  - Remove comment if you Want to generate QR code for the memo field value (default):
    - ``return newRecord.getValue({fieldId: 'memo'});``
  - Want to customize more? Just write your code in getData():
    - ``return "Here is my QR code!"``
- How to make QR code bigger?
  - Increase value of CELL_SIZE in NetSuiteQRCodeGenerator_UE

## Credits
- QR Code Generator for JavaScript (http://www.d-project.com/)

## Screenshots
![App Screenshot](screenshots/screenshot2.png)
![App Screenshot](screenshots/screenshot1.png)
