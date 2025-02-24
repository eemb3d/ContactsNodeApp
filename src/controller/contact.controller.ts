import { Request, Response, NextFunction } from 'express';

import * as config from '../config';
import { log } from '../utils/logger';
import { Contact } from '../model/contact.model';
import {
    getApplicationData,
    getApplicationDataByID,
    removeApplicationDataByID,
    setApplicationDataByID,
    setApplicationDataKey
} from '../service/data.service';

export const get = (_req: Request, res: Response) => {
    return res.render(config.CONTACT);
};

export const getAll = (_req: Request, res: Response) => {
    const contacts = getApplicationData();
    return res.render(config.CONTACTS_PAGE, {contacts});
};

export const post = (req: Request, res: Response, next: NextFunction) => {
    try {
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const phoneNumber = req.body.phone_number;

        log.info(`First Name: ${firstName}, Last Name:  ${lastName}, Last Name:  ${phoneNumber} Created`);

        setApplicationDataKey(req.body);

        return res.redirect(config.CONTACTS_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const contactID = req.params[config.ID];
        const contactData: Contact = getApplicationDataByID(contactID);

        log.info(`First Name: ${contactData.first_name}, Contact ID: ${contactID} Retrieved`);

        return res.render(config.CONTACT, { ...contactData, [config.ID]: contactID });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const postById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactID = req.params[config.ID];
        const firstName = req.body.first_name;

        log.info(`First Name: ${firstName}, Contact ID: ${contactID} Updated.`);

        setApplicationDataByID(req.body, contactID);

        return res.redirect(config.CONTACTS_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`Contact ID Removed: ${req.params[config.ID]}`);

        removeApplicationDataByID(req.params[config.ID]);

        return res.redirect(config.CONTACTS_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};