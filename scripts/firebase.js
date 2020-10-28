// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGriO_mObi63NKV51VP4CghnyHpC2Rfqk",
  authDomain: "chat-web-8d1fc.firebaseapp.com",
  databaseURL: "https://chat-web-8d1fc.firebaseio.com",
  projectId: "chat-web-8d1fc",
  storageBucket: "chat-web-8d1fc.appspot.com",
  messagingSenderId: "256511006078",
  appId: "1:256511006078:web:0f838a812c01a64d5e8f2f",
  measurementId: "G-7HTRCWT0HF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const userRefs = db.collection('users');
