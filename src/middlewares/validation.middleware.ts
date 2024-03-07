import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

import { HttpException } from '../errors/HttpException';

export const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  isArray: boolean = false,
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    if (isArray) {
      if (!Array.isArray(req[value])) {
        return next(new HttpException(400, 'Expected an array'));
      }
      Promise.all(req[value].map((item: any) => validate(plainToClass(type, item), { skipMissingProperties, whitelist, forbidNonWhitelisted }))).then(
        (arrayErrors: ValidationError[][]) => {
          const errors = arrayErrors.reduce((acc, val) => acc.concat(val), []);
          if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            next(new HttpException(400, message));
          } else {
            next();
          }
        },
      );
    } else {
      validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
    }
  };
};

export default validationMiddleware;
