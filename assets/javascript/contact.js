$("#add-contact").click(function (event) {

  event.preventDefault();


  var firstName = $("#first-name").val().trim();
  var lastName = $("#last-name").val().trim();
  var email = $("#email").val().trim();
  var comments = $("#text-area").val().trim();

  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(comments);

  alert("Thank you for contacting Bummer Passwords")
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

$("#logout-link").on("click", function (event) {
  event.preventDefault();

  firebase.auth().signOut().then(function () {
  }).catch(function (error) {
    $('#alertModalBody').text("logout failed, try again");
    $('#alertModal').modal('show');
    console.log(error);
    return;
  });
});

// Listen to auth state changes
firebase.auth().onAuthStateChanged(function (user) {
  console.log("logged out", user);
  if (!user) {
    document.location.href = "index.html";
  }
});
