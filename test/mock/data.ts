import { jest, expect } from '@jest/globals';

import * as config from '../../src/config';
import express from 'express';

export const GET_REQUEST_MOCK = { method: 'GET', path: '/test' };
export const MOCK_POST_CONTACT = {
    first_name: 'First',
    last_name: 'Last',
    phone_number: '12345678'
};

export const MOCK_POST_INFO = { test: 'test' };
export const MOCK_CONTACT = {
    id: "123",
    first_name: "first_name",
    last_name: "last_name",
    address_line1: "address_line1",
    address_line2: "address_line2",
    address_town: "address_town",
    address_county: "address_county",
    address_post_code: "address_post_code"
}

export const MOCK_CORS_VALUE = {
    origin: [config.CDN_HOST, config.BASE_URL],
    credentials: true
};

export const MOCK_ERROR = {
    message: 'Error message'
} as Error;

export const MOCK_HELMET_VALUE = {
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'"],
            styleSrc: ["'self'", config.CDN_HOST],
            scriptSrc: [
                "'self'",
                "'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw='",
                "'sha256-rDMP7u4Lf+tIufrYmUZIhcf2T3WBD4Pweu0EXe+qaLA='",
                "'sha256-wJphCpPdstup3Ojta3HnXJ3EOilATTTWg5oi4S9oi4s='",
                config.CDN_HOST
            ],
            imgSrc: ["'self'", 'data:', config.CDN_HOST],
            connectSrc: ["'self'"],
            formAction: ["'self'"],
            objectSrc: ["'none'"]
        },
        reportOnly: false
    }
};

export const MOCK_RATE_LIMIT_VALUE = {
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: expect.any(Function)
};

export const MOCK_EXPRESS_APP = {
    use: jest.fn()
} as unknown as express.Application;
