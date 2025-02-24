jest.mock('../../../src/utils/logger');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import request from 'supertest';

import app from '../../../src/app';
import {
    MOCK_NOT_FOUND_RESPONSE,
    MOCK_WRONG_URL
} from '../../mock/text.mock';

describe('Error integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should render page not found if url not recognised', async () => {
        const res = await request(app).get(MOCK_WRONG_URL);

        expect(res.text).toContain(MOCK_NOT_FOUND_RESPONSE);
        expect(res.status).toEqual(404);
    });
});
