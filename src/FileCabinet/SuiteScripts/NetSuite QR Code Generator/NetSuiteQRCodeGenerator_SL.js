/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author Georgi Mihaylov <mihaylov@gmail.com>
 * @see {@link https://github.com/gmihaylov/netsuite-qr-code-generator}
 */
define([
        './NetSuiteQRCodeGenerator_SL_Config',
        'N/ui/serverWidget',
        'N/log',
        'N/render',
        './lib/qrcode'
    ],

    (
        CONFIG,
        ui,
        log,
        render,
        qrcode
    ) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                scriptContext.response.writePage(getInputForm());
            }

            if(scriptContext.request.method === 'POST') {
                const postParameters = getPostParameters(scriptContext);
                scriptContext.response.writePage(getQRForm(postParameters));
            }

        }

        const getInputForm = () => {
            const form = ui.createForm({
                title: CONFIG.APP.NAME,
                hideNavBar: false
            });

            const dataFld = form.addField({
                id: CONFIG.SUITELET.FIELDS.DATA.ID,
                type: ui.FieldType.TEXT,
                label: CONFIG.SUITELET.FIELDS.DATA.LABEL
            }).defaultValue = 'https://github.com/gmihaylov';


            form.addSubmitButton(CONFIG.SUITELET.BUTTONS.GENERATE.LABEL);

            return form;
        }

        const getQRForm = (parameters) => {
            const form = ui.createForm({
                title: CONFIG.APP.NAME,
                hideNavBar: false
            });

            const data = parameters[CONFIG.SUITELET.FIELDS.DATA.ID];

            const dataFld = form.addField({
                id: CONFIG.SUITELET.FIELDS.DATA.ID,
                type: ui.FieldType.TEXT,
                label: CONFIG.SUITELET.FIELDS.DATA.LABEL
            }).defaultValue = data;

            const qr = qrcode(0, "M");
            qr.addData(data);
            qr.make();
            qrdata = qr.createDataURL(10, 6);

            const html = `<img src="${qrdata}" alt="QR Code"/>`

            const resultFld = form.addField({
                id: CONFIG.SUITELET.FIELDS.RESULT.ID,
                type: ui.FieldType.INLINEHTML,
                label: CONFIG.SUITELET.FIELDS.RESULT.LABEL
            }).updateLayoutType({
                layoutType: ui.FieldLayoutType.OUTSIDEBELOW
            }).defaultValue = html;


            form.addSubmitButton(CONFIG.SUITELET.BUTTONS.GENERATE.LABEL);

            return form;
        }

        const getPostParameters = (scriptContext) => {
            const parameters = {};
            const requestParameters = scriptContext.request.parameters;

            parameters[CONFIG.SUITELET.FIELDS.DATA.ID] = requestParameters[CONFIG.SUITELET.FIELDS.DATA.ID];

            log.debug({
                title: CONFIG.APP.NAME,
                details: `POST Parameters: ${JSON.stringify(parameters)}`
            })

            return parameters;
        }

        return {onRequest}

    });
