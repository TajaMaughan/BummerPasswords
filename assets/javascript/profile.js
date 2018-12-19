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

$("#logout-link").on("click", function (event) {
    event.preventDefault();

    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
        alert("logout failed, try again");
        console.log(error);
    });
});

//Listen to auth state changes
firebase.auth().onAuthStateChanged(function (user) {
    console.log("logged out", user);
    if (!user) {
        document.location.href = "login.html";
    }
});
