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
const messageRef = db.collection("messages");
const form = document.querySelector(".chat__controls");
const chatBody = document.querySelector('.chat__body');
const chatMessages = document.querySelector('.chat__messages');
let messageStorage = window.localStorage;
let myUser;

function renderMessages(list) {
  chatMessages.innerHTML = "";

  list.forEach(function (elem, i) {
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat__box');

    newMessage.innerHTML = `
    <h1> ${elem.username} </h1>
      <p> ${elem.message}</p>
    `
    chatMessages.appendChild(newMessage);

    if(elem.username == myUser) {
        newMessage.classList.add('chat__box--mine');
    }
  });

}

function getMessages() {
  messageRef.onSnapshot(function (querySnapshot) {

    const objects = [];
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      obj.id = doc.id;
      objects.push(obj);
      // console.log(`${doc.id} => ${doc.data()}`);
    });

    let arraySorted = objects.sort(function(a, b) {
      return a.time - b.time;
    });
    renderMessages(arraySorted);
  });
}

getMessages();

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const usermessage = {
    username: form.username.value,
    message: form.message.value,
    time: Date.now()
  }

  myUser = usermessage.username;

  messageRef.add(usermessage)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      getMessages();
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
})