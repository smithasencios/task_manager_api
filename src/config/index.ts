import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: Number(process.env.APP_PORT ?? process.env.PORT ?? 3000),
    firebase: {
        projectId: process.env.APP_FIREBASE_PROJECT_ID ?? process.env.FIREBASE_PROJECT_ID ?? '',
        clientEmail: process.env.APP_FIREBASE_CLIENT_EMAIL ?? process.env.FIREBASE_CLIENT_EMAIL ?? '',
        privateKey: (process.env.APP_FIREBASE_PRIVATE_KEY ?? process.env.FIREBASE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
        serviceAccountJson: process.env.APP_FIREBASE_SERVICE_ACCOUNT_JSON ?? process.env.FIREBASE_SERVICE_ACCOUNT_JSON ?? '',
    },
};
