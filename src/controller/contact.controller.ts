import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import * as config from '../config';
import { log } from '../utils/logger';
import { Contact } from '../model/contact.model';
import {
    getApplicationData,
    getApplicationDataByID,
    removeApplicationDataByID,
    setApplicationData
} from '../service/data.service';

export const get = (_req: Request, res: Response) => {
    return res.render(config.CONTACT);
};

export const getAll = async (_req: Request, res: Response) => {
    const contacts = await getApplicationData();
    return res.render(config.CONTACTS_PAGE, { contacts });
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const phoneNumber = req.body.phone_number;

        log.info(`First Name: ${firstName}, Last Name: ${lastName}, Phone: ${phoneNumber} Created.`);

        await setApplicationData({ [config.ID]: uuidv4(), ...req.body });

        return res.redirect(config.CONTACTS_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactID = req.params[config.ID];
        const contactData: any = await getApplicationDataByID(contactID);

        log.info(`First Name: ${contactData.first_name}, Contact ID: ${contactID} Retrieved.`);

        return res.render(config.CONTACT, { ...contactData, [config.ID]: contactID });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const postById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactID = req.params[config.ID];
        const firstName = req.body.first_name;

        log.info(`First Name: ${firstName}, Contact ID: ${contactID} Updated.`);

        await setApplicationData(req.body, contactID);

        return res.redirect(config.CONTACTS_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`Contact ID Removed: ${req.params[config.ID]}.`);

        await removeApplicationDataByID(req.params[config.ID]);

        return res.redirect(config.CONTACTS_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};