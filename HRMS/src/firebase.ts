import firebase from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBx-egZ2J0ykvz9vNJPDfzUqC-QFbeDAl8",
	authDomain: "hrms-935f7.firebaseapp.com",
	projectId: "hrms-935f7",
	storageBucket: "hrms-935f7.appspot.com",
	messagingSenderId: "275851848472",
	appId: "1:275851848472:web:ae59a5ce0f146b01c38c6d",
};

export default firebase.initializeApp(firebaseConfig);

// const db = getFirestore(app);
