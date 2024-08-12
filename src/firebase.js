import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import {} from "firebase/firestore";

// "Usually, you need to fastidiously guard API keys (for example, by using a vault service or setting the keys as environment variables);
// however, API keys for Firebase services are OK to include in code or checked-in config files."
// https://firebase.google.com/docs/web/setup#add-sdks-initialize
const firebaseConfig = {
	apiKey: "AIzaSyDy-JKfdIm_o7FRlOVFnIkSQIvH7kw6GlA",
	authDomain: "fir-test-project-630f1.firebaseapp.com",
	projectId: "fir-test-project-630f1",
	storageBucket: "fir-test-project-630f1.appspot.com",
	messagingSenderId: "229119931491",
	appId: "1:229119931491:web:161506f3fd1334a6eaf456",
};

// initialise firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
