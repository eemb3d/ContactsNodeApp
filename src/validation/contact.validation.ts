import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';

export const validationContact = [
    body('first_name')
        .not()
        .isEmpty({ ignore_whitespace: true })
        .withMessage(ErrorMessages.FIRST_NAME),

    body('last_name')
        .not()
        .isEmpty({ ignore_whitespace: true })
        .withMessage(ErrorMessages.LAST_NAME),

    body('phone_number')
        .not()
        .isEmpty({ ignore_whitespace: true })
        .withMessage(ErrorMessages.PHONE_NUMBER),
];
