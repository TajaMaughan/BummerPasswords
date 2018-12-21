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
//when page is ready, make is so that you can add a card.
$(document).ready(function () {

  var database = firebase.database();
  var website = "";
  var username = "";
  var password = "";
  var cardArray = [];
  var cardNumber = 0;


  $("#logout-link").on("click", function (event) {
    event.preventDefault();

    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      alert("logout failed, try again");
      console.log(error);
    });
  });

  //when the add card button is clicked, the information in the form is sent to the database.
  $("#addCard").click(function () {
    event.preventDefault();
    website = $("#websiteValue").val().trim();
    username = $("#usernameValue").val().trim();
    password = $("#passwordValue").val().trim();
    if (website === "" || username === "" || password === "") {
      $("#errorMessage").html("Please fill out all fields");
      return false;
    }
    //resets the form to bve blank
    $("#websiteValue").val("");
    $("#usernameValue").val("");
    $("#passwordValue").val("");
    $("#errorMessage").html("");

    database.ref().push({
      website: website,
      username: username,
      password: password
    })
  })
  //then the information is pulled from the database and put on the screen
  database.ref().on("child_added", function (snapshot) {
    var snapshot = snapshot.val();
    console.log(snapshot.website);
    cardNumber++;
    cardArray.push(cardNumber);
      $("#cardSpace").append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title"><a href="http://www.' + snapshot.website + ' class="website">Website:  ' + snapshot.website + '</a></h5><p class="card-text" class="username">Username: ' + snapshot.username + '</p><p class="card-text" class="password">Password: ' + snapshot.password + '</p><button href="#" class="btn btn-primary edit">Edit</button><button href="#" class="btn btn-primary delete">Delete</button></div></div>');
      console.log(cardArray);
  })
  for(i = 0; i < cardArray.length; i++) {
    $(".card").each(function() {
      $(this).attr("id", [i]);
    })
  }
  $(".delete").click(function () {
    console.log("clicked");
  })
})
