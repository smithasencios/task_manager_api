import * as admin from 'firebase-admin';
import { config } from '../../config';

export class FirebaseClient {
    private static instance: FirebaseClient;
    private db: admin.firestore.Firestore;
    private auth: admin.auth.Auth;

    private constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: config.firebase.projectId,
                    clientEmail: config.firebase.clientEmail,
                    privateKey: config.firebase.privateKey,
                }),
            });
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
