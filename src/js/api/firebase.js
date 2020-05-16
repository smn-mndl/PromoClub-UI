import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2Lex7-f6fU07_63rMbi2hX41ddnVgrrI",
  authDomain: "promoclub-ind.firebaseapp.com",
  databaseURL: "https://promoclub-ind.firebaseio.com",
  projectId: "promoclub-ind",
  storageBucket: "promoclub-ind.appspot.com",
  messagingSenderId: "205811479738",
  appId: "1:205811479738:web:2c78bbd20c66cf13c57e83",
  measurementId: "G-CWZBN6G6SH"
};

console.log("firebaseCnfg", firebaseConfig);
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
