import { NextFunction, Request, Response } from 'express';
import { validationResult, FieldValidationError } from 'express-validator';

import { log } from '../utils/logger';
import { FormattedValidationErrors } from '../model/validation.model';
import { validateFilepath } from '../utils/validateFilepath';

export const checkValidations = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const errorList = validationResult(req);

        if (!errorList.isEmpty()) {
            const validatedFilepath = validateFilepath(req.path);
            const template_path = validatedFilepath.substring(1).split("/")[0];
            const errors = formatValidationError(
				errorList.array() as FieldValidationError[]
            );

            log.info(`Validation error on ${template_path} page`);

            return res.render(template_path, { ...req.body, errors });
        }

        return next();
    } catch (err: any) {
        log.error(err.message);
        next(err);
    }
};

const formatValidationError = (errorList: FieldValidationError[]) => {
    const errors = { errorList: [] } as FormattedValidationErrors;
    errorList.forEach((e: FieldValidationError) => {
        errors.errorList.push({ href: `#${e.path}`, text: e.msg });
        errors[e.path] = { text: e.msg };
    });
    return errors;
};
