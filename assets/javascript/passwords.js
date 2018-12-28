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
var passwordsDbRef;

function setPasswordField(randomPassword) {
  $("#passwordValue").val(randomPassword);
}

//when page is ready, make is so that you can add a card.
$(document).ready(function () {
  var website = "";
  var username = "";
  var password = "";

  $("#generator").on("click", function (event) {
    event.preventDefault();

    var queryURL = "https://cors-anywhere.herokuapp.com/https://www.passwordrandom.com/query?command=password&format=json&count=1"

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function (response) {
        setPasswordField(response.char[0]);
      });
  })

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
    if (!user) {
      console.log("logged out");
      document.location.href = "login.html";
    } else {
      console.log("logged in", user);
      passwordsDbRef = firebase.database().ref('passwords/' + user.uid);

      //then the information is pulled from the database and put on the screen
      passwordsDbRef.on("child_added", function (child) {
        var snapshot = child.val();
        console.log(child.key);

        var div = '<div class="card col-xs-12 col-sm-6 col-md-4 col-lg-3 m-3" id="card' + child.key + '"><div class="card-body"><h5 class="card-title"><a href="http://www.' + snapshot.website + '" target="_blank" class="website">Website:  ' + snapshot.website + '</a></h5><p class="card-text" class="username">Username: ' + snapshot.username + '</p><p class="card-text" class="password">Password: ' + snapshot.password + '</p><button href="#" class="btn btn-primary delete" data-id="' + child.key + '">Delete</button></div></div>';
        $("#cardSpace").append(div);
      })
      //when card is removed from database, card is removed from website
      passwordsDbRef.on("child_removed", function (child) {
        $("#card" + child.key).remove();
      })
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
    //resets the form to blank
    $("#websiteValue").val("");
    $("#usernameValue").val("");
    $("#passwordValue").val("");
    $("#errorMessage").html("");

    passwordsDbRef.push({
      website: website,
      username: username,
      password: password
    })
  })

  //removes card from database
  $("body").on("click", ".delete", function () {
    var id = $(this).attr("data-id")
    passwordsDbRef.child(id).remove();
  })
})