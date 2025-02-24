import express from 'express';
import helmet from 'helmet';

import * as config from '../config';

export const configureHelmet = (app: express.Application) => {
    app.use(helmet({
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
                    // `'nonce-${res.locals.nonceScript}'`
                ],
                imgSrc: ["'self'", 'data:', config.CDN_HOST],
                connectSrc: ["'self'"],
                formAction: ["'self'"],
                objectSrc: ["'none'"]
            },
            reportOnly: false
        }
    }));
};
