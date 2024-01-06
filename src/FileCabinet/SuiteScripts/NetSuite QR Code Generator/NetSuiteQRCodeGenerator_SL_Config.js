/**
 * @NApiVersion 2.1
 */
define([],

    () => {

        const PARAMETERS = {
            APP: {},
            SCRIPT_PARAMETERS: {},
            SUITELET: {
                FIELDS: {},
                BUTTONS: {}
            }
        };

        // App
        PARAMETERS.APP.NAME = 'NetSuite QR Code Generator';

        // Suitelet / GET
        PARAMETERS.SUITELET.FIELDS.DATA = {
            ID: 'custpage_data',
            LABEL: 'Data:'
        }

        PARAMETERS.SUITELET.FIELDS.RESULT = {
            ID: 'custpage_result',
            LABEL: 'Result:'
        }

        PARAMETERS.SUITELET.BUTTONS.GENERATE = {
            LABEL: 'Generate'
        }

        return PARAMETERS;

    });
