jest.mock('../../../src/middleware/logger.middleware');
jest.mock('../../../src/utils/logger');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../src/app';
import * as config from '../../../src/config';
import { logger } from '../../../src/middleware/logger.middleware';
import { log } from '../../../src/utils/logger';

import {
    MOCK_REDIRECT_MESSAGE,
    MOCK_GET_CONTACT_RESPONSE,
    MOCK_POST_CONTACT_RESPONSE,
    MOCK_SUBMIT_CONTACT_MESSAGE,
} from '../../mock/text.mock';
import { MOCK_POST_CONTACT } from '../../mock/data';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation(
    (_req: Request, _res: Response, next: NextFunction) => next()
);

describe('CONTACT endpoint integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the CONTACT page', async () => {
            const res = await request(app).get(config.CONTACT_URL + config.CREATE);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_SUBMIT_CONTACT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
        });
    });

    describe('POST tests', () => {
        test('Should redirect to landing page after POST request', async () => {
            const res = await request(app)
                .post(config.CONTACT_URL + config.CREATE)
                .send(MOCK_POST_CONTACT);

            expect(res.status).toEqual(302);
            expect(res.text).toContain(MOCK_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
        });

        test('Should render the same page with error messages after POST request', async () => {
            const res = await request(app)
                .post(config.CONTACT_URL + config.CREATE)
                .send({
                    first_name: '',
                });

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_CONTACT_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
        });

        test('Should log the First Name and More Details on POST request.', async () => {
            const mockLog = log.info as jest.Mock;
            const res = await request(app)
                .post(config.CONTACT_URL + config.CREATE)
                .send(MOCK_POST_CONTACT);

            expect(mockLog).toBeCalledWith(MOCK_POST_CONTACT_RESPONSE);
            expect(res.text).toContain(MOCK_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
        });
    });
});
