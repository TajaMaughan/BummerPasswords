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
            $('#alertModalBody').text('Email and password required');
            $('#alertModal').modal('show');
            return;
        }
        //Sign in user
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                //Handle Errors here.
                $('#alertModalBody').text('Invalid email or password');
                $('#alertModal').modal('show');
                console.log('signIn error', error);
                return;
            });
    });


    //Register Button
    $("#create-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();


        if (!email || !password) {
            $('#alertModalBody').text('Email and password required to create an account.');
            $('#alertModal').modal('show');
            return;
        }

        //Register user
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                console.log('register error', error);
                if (error.code === 'auth/email-already-in-use') {
                    $('#alertModalBody').text("This email is already in use. Log in or try to register another email.");
                    $('#alertModal').modal('show');
                } else if (error.code === 'auth/weak-password') {
                    $('#alertModalBody').text("Password requires at least 6 characters");
                    $('#alertModal').modal('show');
                    return;
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