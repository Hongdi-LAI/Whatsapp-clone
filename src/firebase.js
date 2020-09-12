import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyANR_KlzJWw5vr8TFrglbPVebBYDLgxx-0",
    authDomain: "whatsapp-clone-847bd.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-847bd.firebaseio.com",
    projectId: "whatsapp-clone-847bd",
    storageBucket: "whatsapp-clone-847bd.appspot.com",
    messagingSenderId: "999533175700",
    appId: "1:999533175700:web:c11417afd37d59d0ebe581",
    measurementId: "G-7YE8H4TEX0"
  };

  const firebaseApp = firebase.initializeApp (firebaseConfig);
  
  // User Authetication Setup
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth, provider};

  // Database Setup
  const db = firebaseApp.firestore();
  export default db;