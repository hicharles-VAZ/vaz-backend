import * as Joi from 'joi'

export const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
    PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
    STORAGE_DRIVER: Joi.string().valid('local', 's3').required(),
    S3_BUCKET: Joi.string().optional(),
    S3_REGION: Joi.string().optional(),
    S3_ACCESS_KEY: Joi.string().optional(),
    S3_SECRET_KEY: Joi.string().optional(),
    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.number().required(),
    SMTP_USER: Joi.string().required(),
    SMTP_PASS: Joi.string().required(),
    TEAMS_TENANT_ID: Joi.string().required(),
    TEAMS_CLIENT_ID: Joi.string().required(),
    TEAMS_CLIENT_SECRET: Joi.string().required()
})
