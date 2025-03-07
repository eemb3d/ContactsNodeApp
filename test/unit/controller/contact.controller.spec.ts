jest.mock('../../../src/utils/logger');
jest.mock('../../../src/service/data.service');

import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { get, post, getAll, postById, getById, removeById } from '../../../src/controller/contact.controller';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';
import {
    getApplicationData,
    getApplicationDataByID,
    removeApplicationDataByID,
    setApplicationData
} from '../../../src/service/data.service';

import {
    MOCK_POST_CONTACT,
    MOCK_CONTACT,
    MOCK_POST_MSG,
    MOCK_ID,
    MOCK_POST_BY_ID_MSG,   
    MOCK_GET_BY_ID_MSG,
    MOCK_REMOVE_BY_ID_MSG
} from '../../mock/data';

const req = {
    body: MOCK_POST_CONTACT,
    params: {
        [config.ID]: MOCK_ID
    }
} as any as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.redirect = jest.fn().mockReturnValue(res) as any;
    return res;
};

const next = jest.fn() as NextFunction;

const mockedGetApplicationData = getApplicationData as jest.Mock;
const mockedGetApplicationDataByID = getApplicationDataByID as jest.Mock;
const mockedRemoveApplicationDataByID = removeApplicationDataByID as jest.Mock;
const mockedSetApplicationData = setApplicationData as jest.Mock;
const mockLogInfo = log.info as jest.Mock;
const mockLogErrorRequest = log.errorRequest as jest.Mock;

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
        test('should render Contacts page', async () => {
            const res = mockResponse();
            mockedGetApplicationData.mockReturnValueOnce([MOCK_CONTACT]);

            await getAll(req, res);

            expect(mockedGetApplicationData).toHaveBeenCalledTimes(1);
            expect(res.render).toHaveBeenCalledWith(config.CONTACTS_PAGE, {"contacts": [MOCK_CONTACT]});
        });
    });

    describe('Contact POST tests', () => {
        test('should redirect to Contacts Page on POST request', async () => {
            const res = mockResponse();

            await post(req, res, next);

            expect(mockLogInfo).toBeCalledWith(MOCK_POST_MSG);
            expect(mockedSetApplicationData).toBeCalledTimes(1);
            expect(mockLogErrorRequest).not.toHaveBeenCalled();
            expect(res.redirect).toBeCalledWith(config.CONTACTS_URL);
        });
        test('should handle the reject and log error', async () => {
            const res = mockResponse();
            mockedSetApplicationData.mockRejectedValueOnce({} as never);
            await post(req, res, next);

            expect(next).toBeCalledTimes(1);
            expect(mockLogErrorRequest).toHaveBeenCalledWith(req, undefined);
        });
    });

    describe('Contact GETTByID tests', () => {
        test('should render the Contact Page on GET By ID request', async () => {
            const res = mockResponse();
            mockedGetApplicationDataByID.mockReturnValueOnce(MOCK_CONTACT);

            await getById(req, res, next);

            expect(mockLogInfo).toBeCalledWith(MOCK_GET_BY_ID_MSG);
            expect(mockedGetApplicationDataByID).toBeCalledTimes(1);
            expect(mockLogErrorRequest).not.toHaveBeenCalled();
            expect(res.render).toBeCalledWith(config.CONTACT, MOCK_CONTACT);
        });
        test('should handle the reject and log error', async () => {
            const res = mockResponse();
            mockedGetApplicationDataByID.mockRejectedValueOnce({} as never);
            await getById(req, res, next);

            expect(next).toBeCalledTimes(1);
            expect(mockLogErrorRequest).toHaveBeenCalledWith(req, undefined);
        });
    });

    describe('Contact POSTByIDtests', () => {
        test('should redirect to Contacts Page on POST by ID request', async () => {
            const res = mockResponse();

            await postById(req, res, next);

            expect(mockLogInfo).toBeCalledWith(MOCK_POST_BY_ID_MSG);
            expect(mockedSetApplicationData).toBeCalledTimes(1);
            expect(mockLogErrorRequest).not.toHaveBeenCalled();
            expect(res.redirect).toBeCalledWith(config.CONTACTS_URL);
        });
        test('should handle the reject and log error', async () => {
            const res = mockResponse();
            mockedSetApplicationData.mockRejectedValueOnce({} as never);
            await postById(req, res, next);

            expect(next).toBeCalledTimes(1);
            expect(mockLogErrorRequest).toHaveBeenCalledWith(req, undefined);
        });
    });

    describe('Contact REMOVE BY ID tests', () => {
        test('should render the Contact Page on REMOVE By ID request', async () => {
            const res = mockResponse();

            await removeById(req, res, next);

            expect(mockLogInfo).toBeCalledWith(MOCK_REMOVE_BY_ID_MSG);
            expect(mockedRemoveApplicationDataByID).toBeCalledTimes(1);
            expect(mockLogErrorRequest).not.toHaveBeenCalled();
            expect(res.redirect).toBeCalledWith(config.CONTACTS_URL);
        });
        test('should handle the reject and log error', async () => {
            const res = mockResponse();
            mockedRemoveApplicationDataByID.mockRejectedValueOnce({} as never);
            await removeById(req, res, next);

            expect(next).toBeCalledTimes(1);
            expect(mockLogErrorRequest).toHaveBeenCalledWith(req, undefined);
        });
    });
});
