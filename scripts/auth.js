let currentUser;

firebase.auth().onAuthStateChanged(function(user){
    if(user) {
        userRefs.doc(user.uid).get().then(function(doc) {
            if(doc.exists) {
                const data = doc.data();
                currentUser = data.user;
                getMessages();
            }
        });
    } else {
        currentUser = null;
    }
});
