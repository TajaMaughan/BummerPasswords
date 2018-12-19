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
$(document).ready(function () {
var database = firebase.database();
var website = "";
var username = "";
var password = "";

  $("#addCard").click(function () {
    event.preventDefault();
    website = $("#websiteValue").val().trim();
    username = $("#usernameValue").val().trim();
    password = $("#passwordValue").val().trim();

    $("#websiteValue").val("");
    $("#usernameValue").val("");
    $("#passwordValue").val("");

    database.ref().push({
      website: website,
      username: username,
      password: password
    })
    console.log("clicked");
  })


  database.ref().on("child_added", function (snapshot) {
    var snapshot = snapshot.val();
    $("#cardSpace").append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title"><a href="#" id="website">Website:  ' + snapshot.website + '</a></h5><p class="card-text" id="username">Username: ' + snapshot.username + '</p><p class="card-text" id="password">Password: ' + snapshot.password + '</p><a href="#" class="btn btn-primary">Edit</a><a href="#" class="btn btn-primary">Delete</a></div></div>');
  })
})