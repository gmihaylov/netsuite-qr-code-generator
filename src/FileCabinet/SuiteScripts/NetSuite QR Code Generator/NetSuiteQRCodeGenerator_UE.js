/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author Georgi Mihaylov <mihaylov@gmail.com>
 * @see {@link https://github.com/gmihaylov/netsuite-qr-code-generator}
 */
define(['N/ui/serverWidget', './lib/qrcode', 'N/url'],
    
    (ui, qrcode, url) => {

        const CELL_SIZE = 10;
        const MARGIN = 6;

        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
                if(scriptContext.type === scriptContext.UserEventType.VIEW) {
                        const form = scriptContext.form;
                        const htmlFld = form.addField({
                                id: 'custpage_qr_code',
                                type: ui.FieldType.INLINEHTML,
                                label: 'QR Code'
                        }).updateLayoutType({
                                layoutType: ui.FieldLayoutType.STARTROW
                        });
                        form.insertField({
                                field : htmlFld,
                                nextfield : 'tranid'
                        });

                        htmlFld.defaultValue = generateQRCode(getData(scriptContext.newRecord))
                }
        }

        const getData = (newRecord) => {
                // Record Absolute URL
                //return resolveRecordUrl(newRecord.type, newRecord.id);

                // Tranid
                //return newRecord.getValue({fieldId: 'tranid'});

                // Memo
                return newRecord.getValue({fieldId: 'memo'});
        }

        const resolveRecordUrl = (type, id) => {
                const scheme = 'https://';
                const host = url.resolveDomain({
                        hostType: url.HostType.APPLICATION
                });
                const relativePath = url.resolveRecord({
                        recordType: type,
                        recordId: id,
                        isEditMode: false
                });
                return scheme + host + relativePath;
        }

        const generateQRCode = (data) => {
                const qr = qrcode(0, "M");
                qr.addData(data);
                qr.make();
                const qrdata = qr.createDataURL(CELL_SIZE, MARGIN);

                return `<img src="${qrdata}" alt="QR Code"/>`
        }

        return {beforeLoad}

    });
