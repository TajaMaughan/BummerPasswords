$("#add-contact").click(function(event) {

    event.preventDefault();

    
    var firstName = $("#first-name").val().trim();
    var lastName = $("#last-name").val().trim();
    var email = $("#email").val().trim();
    var comments = $("#text-area").val().trim();

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(comments);

  alert("You've been successfully signed up")
})

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