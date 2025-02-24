jest.mock('../../../src/utils/logger');

import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { get, post, getAll } from '../../../src/controller/contact.controller';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';

import { MOCK_POST_CONTACT } from '../../mock/data';
import { MOCK_POST_CONTACT_RESPONSE } from '../../mock/text.mock';

const req = {
    body: MOCK_POST_CONTACT,
} as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.redirect = jest.fn().mockReturnValue(res) as any;
    return res;
};

const next = jest.fn() as NextFunction;

describe('Contact controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Contact GET tests', () => {
        test('should render Contact page', () => {
            const res = mockResponse();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.CONTACT);
        });
    });

    describe('Contact GET All tests', () => {
        test('should render Contacts page', () => {
            const res = mockResponse();

            getAll(req, res);

            expect(res.render).toHaveBeenCalledWith(config.CONTACTS_PAGE, {"contacts": []});
        });
    });

    describe('Contact POST tests', () => {
        test('should redirect to landing-page on POST request', () => {
            const res = mockResponse();

            post(req, res, next);

            expect(res.redirect).toBeCalledWith(config.CONTACTS_URL);
        });
        test('should log GitHub handle and More Details on POST request', () => {
            const res = mockResponse();

            const mockLogInfo = log.info as jest.Mock;

            post(req, res, next);

            expect(mockLogInfo).toHaveBeenCalledWith(
                MOCK_POST_CONTACT_RESPONSE
            );
        });
    });
});
