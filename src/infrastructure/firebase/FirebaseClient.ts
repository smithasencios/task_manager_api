import * as admin from 'firebase-admin';
import { config } from '../../config';

export class FirebaseClient {
    private static instance: FirebaseClient;
    private db: admin.firestore.Firestore;
    private auth: admin.auth.Auth;

    private constructor() {
        if (!admin.apps.length) {
            const hasServiceAccountPieces =
                Boolean(config.firebase.projectId) &&
                Boolean(config.firebase.clientEmail) &&
                Boolean(config.firebase.privateKey);
            const serviceAccountJson = config.firebase.serviceAccountJson;

            let credential: admin.credential.Credential;

            if (hasServiceAccountPieces) {
                // Priority 1: Use individual env vars if all are present
                credential = admin.credential.cert({
                    projectId: config.firebase.projectId,
                    clientEmail: config.firebase.clientEmail,
                    privateKey: config.firebase.privateKey,
                });
            } else if (serviceAccountJson) {
                // Priority 2: Use full JSON string if individual vars are missing
                const parsed = JSON.parse(serviceAccountJson);
                credential = admin.credential.cert(parsed as admin.ServiceAccount);
            } else {
                // Priority 3: Fall back to Application Default Credentials
                // (GOOGLE_APPLICATION_CREDENTIALS or ambient credentials)
                credential = admin.credential.applicationDefault();
            }

            admin.initializeApp({ credential });
        }
        this.db = admin.firestore();
        this.auth = admin.auth();
    }

    public static getInstance(): FirebaseClient {
        if (!FirebaseClient.instance) {
            FirebaseClient.instance = new FirebaseClient();
        }
        return FirebaseClient.instance;
    }

    public getFirestore(): admin.firestore.Firestore {
        return this.db;
    }

    public getAuth(): admin.auth.Auth {
        return this.auth;
    }
}
