export const configuration = () => ({
    app: {
        name: 'Vaz Desenvolvimento Platform',
        env: process.env.NODE_ENV || 'development',
        port: Number(process.env.PORT) || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    },
    database: {
        url: process.env.DATABASE_URL
    },
    storage: {
        driver: process.env.STORAGE_DRIVER,
        s3: {
            bucket: process.env.S3_BUCKET,
            region: process.env.S3_REGION,
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY
        }
    },
    notifications: {
        email: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        teams: {
            tenantId: process.env.TEAMS_TENANT_ID,
            clientId: process.env.TEAMS_CLIENT_ID,
            clientSecret: process.env.TEAMS_CLIENT_SECRET
        }
    }
})
