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
const form = document.querySelector(".chat__controls");
const chatBody = document.querySelector('.chat__body');
const chatMessages = document.querySelector('.chat__messages');

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
  });

}

function getMessages() {
  db.collection('messages').get() // pide todos los documentos de la colección
  .then((querySnapshot) => {

    const objects = [];
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      obj.id = doc.id;
      objects.push(obj);
      console.log(`${doc.id} => ${doc.data()}`);
    });

    renderMessages(objects);
  });
}

getMessages();


form.addEventListener('submit', function (event) {
  event.preventDefault();

  const usermessage = {
    username: form.username.value,
    message: form.message.value
  }

  db.collection("messages").add(usermessage) // cree un nuevo elemento en la colección
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      getMessages();
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
})