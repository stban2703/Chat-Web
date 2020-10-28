const loginForm = document.querySelector(".form--login");

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const loader = document.querySelector(".loader");
    loader.classList.remove("hidden");
    const email = loginForm.userEmail.value;
    const password = loginForm.password.value

    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        loader.classList.add("hidden");
        window.location.href = "chat.html";

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert("El usuario no existe");
    })
});