import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBjOYO24NLSwFa7n6G32RH84HPPiuAeSFY",
    authDomain: "crown-clothing-ark.firebaseapp.com",
    projectId: "crown-clothing-ark",
    storageBucket: "crown-clothing-ark.appspot.com",
    messagingSenderId: "505187507873",
    appId: "1:505187507873:web:691ab38358b67678921ae0",
    measurementId: "G-7TSE6W6R5T"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {
            displayName,
            email
        } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
