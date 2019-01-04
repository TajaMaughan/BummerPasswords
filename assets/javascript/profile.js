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

function displayPhoto(url) {
    if (!url) {
        return;
    }

    $("#profile-img").attr("src", url);
}

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
    if (!user) {
        console.log("logged out");
        document.location.href = "index.html";
    } else {
        console.log("logged in", user);
        displayPhoto(user.photoURL);
    }
});




// Save button
$("#save-btn").on("click", function (event) {
    event.preventDefault();

    var user = firebase.auth().currentUser;

    var displayName = $("#display-name").val().trim();
    var photoURL = $("#photo").val().trim();

    var updateUser = {};

    if (!displayName && !photoURL) {
        $('#alertModalBody').text("Nothing was provided to update.");
        $('#alertModal').modal('show');
        return;
    }

    if (displayName) {
        updateUser.displayName = displayName;
    }
    if (photoURL) {
        updateUser.photoURL = photoURL;
    }

    user.updateProfile(updateUser).then(function () {
        $('#alertModalBody').text("profile updated");
        $('#alertModal').modal('show');
        displayPhoto(user.photoURL);
    }).catch(function (error) {
        $('#alertModalBody').text("failed to update profile");
        $('#alertModal').modal('show');
        console.log(error);
        return;
    });
});

$("#save-pass-btn").on("click", function (event) {
    event.preventDefault()

    var user = firebase.auth().currentUser;
    var oldPassword = $("#old-password").val().trim();
    var newPassword = $("#password").val().trim();
    var verifyPassword = $("#password2").val().trim();


    if (!oldPassword) {
        $('#alertModalBody').text("Please provide old password");
        $('#alertModal').modal('show');
        return;
    }

    if (!newPassword) {
        $('#alertModalBody').text("Please provide new password");
        $('#alertModal').modal('show');
        return;
    }

    if (!verifyPassword) {
        $('#alertModalBody').text("Please verify password");
        $('#alertModal').modal('show');
        return;
    }

    if (newPassword !== verifyPassword) {
        $('#alertModalBody').text("New password and verify password did not match.");
        $('#alertModal').modal('show');
        return;
    }

    if (newPassword.length <= 5) {
        $('#alertModalBody').text("New password must be at least 6 characters.");
        $('#alertModal').modal('show');
        return;
    }

    var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
    );

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
        // User re-authenticated. We can now update the password.
        user.updatePassword(newPassword).then(function () {
            // Update successful.
            $('#alertModalBody').text("Password updated");
            $('#alertModal').modal('show');
        }).catch(function (error) {
            $('#alertModalBody').text("failed to update password");
            $('#alertModal').modal('show');
            console.log(error);
            return;
        });
    }).catch(function (error) {
        // An error happened.
        $('#alertModalBody').text("re-authentication failed. Check your old password entry and try again.");
        $('#alertModal').modal('show');
        console.log(error);
    });
});


