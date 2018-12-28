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

  $("#logout-link").on("click", function (event) {
    event.preventDefault();

    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      alert("logout failed, try again");
      console.log(error);
    });
  });

  // Listen to auth state changes
  firebase.auth().onAuthStateChanged(function (user) {
    console.log("logged out", user);
    if (!user) {
      document.location.href = "login.html";
    }
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
  database.ref().on("child_added", function (child) {
    var snapshot = child.val();
    console.log(child.key);

    var div = '<div class="card passCard" id="card' + child.key + '" style="width: 18rem;"><div class="card-body"><h5 class="card-title"><a href="http://www.' + snapshot.website + '" target="_blank" class="website">Website:  ' + snapshot.website + '</a></h5><p class="card-text" class="username">Username: ' + snapshot.username + '</p><p class="card-text" class="password">Password: ' + snapshot.password + '</p><button href="#" class="btn btn-primary edit" data-id="' + child.key + '">Edit</button><button href="#" class="btn btn-primary delete" data-id="' + child.key + '">Delete</button></div></div>';
    $("#cardSpace").append(div);

    cardArray.push(div);
  })

  //when the delete button is click, the card is removed.
  database.ref().on("child_removed", function (child) {
    $("#card" + child.key).remove();
  })
  $("body").on("click", ".delete", function () {
    var id = $(this).attr("data-id")
    database.ref().child(id).remove();
  })

  //edit cards
  $("body").on("click", ".edit", function () {
    var id = $(this).attr("data-id")
    $(id).parentElement.html('<div class="card" style="width: 18rem;"><form><div class="form-group"><p id="errorMessage"></p><label for="website">Website (format: example.com)</label><input type="text" class="form-control" id="websiteValue" placeholder=""></div><div class="form-group"><label for="username">Username</label><input type="text" class="form-control" id="usernameValue" placeholder=""></div><div class="form-group"><label for="password">Password</label><input type="text" class="form-control" id="passwordValue" placeholder=""></div><button type="submit" class="btn btn-primary" id="addCard">Add</button></form></div>');
    
    database.ref().child(id).update({website: "yes", username: "it", password: "works"})
  })
  database.ref().on("child_changed", function(){

  })
})



