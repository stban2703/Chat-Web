const messageRef = db.collection("messages");
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

    if(elem.username == currentUser) {
        newMessage.classList.add('chat__box--mine');
    }
    chatMessages.appendChild(newMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

}

function getMessages() {
  messageRef.onSnapshot(function (querySnapshot) {

    const objects = [];
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      obj.id = doc.id;
      objects.push(obj);
    });

    let arraySorted = objects.sort(function(a, b) {
      return a.time - b.time;
    });
    renderMessages(arraySorted);
  });
}

//getMessages();

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const usermessage = {
    username: currentUser,
    message: form.message.value,
    time: Date.now()
  }

  messageRef.add(usermessage)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      getMessages();
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});

const logOutBtn = document.querySelector('.chat__logOut');
logOutBtn.addEventListener('click', function(event) {
    event.preventDefault();
    firebase.auth().signOut();
    window.location.href = "index.html"
});