// Initialize Firebase
var config = {
    apiKey: "AIzaSyBtwbKPk-wwhdgUIVbql_WMwiXXudffNyk",
    authDomain: "bummerpassword.firebaseapp.com",
    databaseURL: "https://bummerpassword.firebaseio.com",
    projectId: "bummerpassword",
    storageBucket: "bummerpassword.appspot.com",
    messagingSenderId: "6699316700"
};
firebase.initializeApp(config);

(function () {
    //Login Button
    $("#login-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();

        if (!email || !password) {
            return alert('email and password required');
        }
        //Sign in user
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                //Handle Errors here.
                console.log('signIn error', error);
                alert("Invalid email or password.");
            });
    });


    //Register Button
    $("#create-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();

        if (!email || !password) {
            return console.log('email and password required');
        }

        //Register user
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                console.log('register error', error);
                if (error.code === 'auth/email-already-in-use') {
                    alert("This email is already in use. Log in or try to register another email.");
                } else if (error.code === 'auth/weak-password') {
                    alert("Password requires at least 6 characters");
                }
            });
    });

    //Listen to auth state changes
    firebase.auth().onAuthStateChanged(function (user) {
        console.log("logged in", user);
        if (user) {
            document.location.href = "passwords.html";
        }
    });
})();