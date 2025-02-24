import { Router } from 'express';

import { checkValidations } from '../middleware/validation.middleware';
import { validationContact } from '../validation/contact.validation';
import { get, getAll, getById, post, postById, removeById } from '../controller/contact.controller';

import * as config from '../config';

const contactRouter = Router();

contactRouter.get(config.CONTACTS_URL, getAll);

// No stage changes! Get Pages per -C-RUD
contactRouter.get(config.CONTACT_URL+ config.CREATE, get);
contactRouter.get(config.CONTACT_URL + config.UPDATE + config.PARAM_ID, getById);
contactRouter.get(config.CONTACT_URL + config.REMOVE + config.PARAM_ID, removeById);

contactRouter.post(
    config.CONTACT_URL + config.CREATE,
    ...validationContact,
    checkValidations,
    post
);
contactRouter.post(
    config.CONTACT_URL + config.UPDATE + config.PARAM_ID,
    ...validationContact,
    checkValidations,
    postById
);

export default contactRouter;
