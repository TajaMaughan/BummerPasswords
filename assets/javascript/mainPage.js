$("#mpb").click(function(event){

    event.preventDefault();

    // alert("Hooray, you want to join")

    location.href='profile.html'
});

var config = {
    apiKey: "AIzaSyBtwbKPk-wwhdgUIVbql_WMwiXXudffNyk",
    authDomain: "bummerpassword.firebaseapp.com",
    databaseURL: "https://bummerpassword.firebaseio.com",
    projectId: "bummerpassword",
    storageBucket: "bummerpassword.appspot.com",
    messagingSenderId: "6699316700"
  };
  firebase.initializeApp(config);