jest.mock('express-validator');
jest.mock('../../../src/utils/logger');
jest.mock('../../../src/utils/validateFilepath.ts');

import {
    describe,
    expect,
    test,
    jest,
    afterEach,
    beforeEach,
} from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import * as config from '../../../src/config';

import { checkValidations } from '../../../src/middleware/validation.middleware';
import { ErrorMessages } from '../../../src/validation/error.messages';
import { MOCK_ERROR, MOCK_POST_CONTACT } from '../../mock/data';
import { log } from '../../../src/utils/logger';
import { validateFilepath } from '../../../src/utils/validateFilepath';

const validationResultMock = validationResult as unknown as jest.Mock;
const validateFilepathMock = validateFilepath as jest.Mock<typeof validateFilepath>;
const logInfoMock = log.info as jest.Mock;
const logErrorMock = log.error as jest.Mock;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn() as any;
    return res;
};
const mockRequest = () => {
    const req = {} as Request;
    req.path = config.CONTACT_URL;
    req.body = MOCK_POST_CONTACT;
    return req;
};
const next = jest.fn() as NextFunction;

describe('Validation Middleware test suites', () => {
    let res: any, req: any;

    beforeEach(() => {
        res = mockResponse();
        req = mockRequest();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call next if errorList is empty', () => {
        validationResultMock.mockImplementationOnce(() => {
            return { isEmpty: () => true };
        });
        checkValidations(req, res, next);

        expect(logInfoMock).toBeCalledTimes(0);
        expect(logErrorMock).toBeCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
    });

    test(`should call res.render with ${config.CONTACT} view if errorList is not empty`, () => {
        const fieldKey = 'first_name';
        validationResultMock.mockImplementationOnce(() => {
            return {
                isEmpty: () => false,
                array: () => [{ path: fieldKey, msg: ErrorMessages.FIRST_NAME }],
            };
        });
        req.body[fieldKey] = '';
        validateFilepathMock.mockImplementationOnce(() => config.CONTACT_URL);
        checkValidations(req, res, next);

        expect(logInfoMock).toHaveBeenCalledTimes(1);
        expect(logInfoMock).toHaveBeenCalledWith(
            `Validation error on ${config.CONTACT} page`
        );
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.CONTACT, {
            ...req.body,
            errors: {
                errorList: [{ href: `#${fieldKey}`, text: ErrorMessages.FIRST_NAME }],
                [fieldKey]: { text: ErrorMessages.FIRST_NAME },
            },
        });
    });

    test('should catch the error log error message and call next(err)', () => {
        validationResultMock.mockImplementationOnce(() => {
            throw new Error(MOCK_ERROR.message);
        });
        checkValidations(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(logErrorMock).toHaveBeenCalledTimes(1);
        expect(logErrorMock).toHaveBeenCalledWith(MOCK_ERROR.message);
    });
});
