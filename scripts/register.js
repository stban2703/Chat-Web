const registerForm = document.querySelector(".form--register");

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const loader = document.querySelector(".loader");
    loader.classList.remove("hidden");
    const email = registerForm.userEmail.value;
    const user = registerForm.userName.value;
    const password = registerForm.password.value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (credentials) {
        const userId = credentials.user.uid;
        userRefs.doc(userId).set({
            email: email,
            user: user
        }).then(function () {
            loader.classList.add("hidden");
            window.location.href = "chat.html";
        });

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
})
