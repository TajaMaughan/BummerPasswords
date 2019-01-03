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
        alert("logout failed, try again");
        console.log(error);
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
        alert("Nothing was provided to update.");
        return;
    }

    if (displayName) {
        updateUser.displayName = displayName;
    }
    if (photoURL) {
        updateUser.photoURL = photoURL;
    }

    user.updateProfile(updateUser).then(function () {
        alert("profile updated")
        displayPhoto(user.photoURL);
    }).catch(function (error) {
        console.log(error);
        alert("failed to update profile");
    });
});

$("#save-pass-btn").on("click", function (event) {
    event.preventDefault()

    var user = firebase.auth().currentUser;
    var oldPassword = $("#old-password").val().trim();
    var newPassword = $("#password").val().trim();
    var verifyPassword = $("#password2").val().trim();


    if (!oldPassword) {
        alert("Please provide old password");
        return;
    }

    if (!newPassword) {
        alert("Please provide new password");
        return;
    }

    if (!verifyPassword) {
        alert("Please verify password");
        return;
    }

    if (newPassword !== verifyPassword) {
        alert("New password and verify password did not match.");
        return;
    }

    if (newPassword.length <= 5) {
        alert("New password must be at least 6 characters.");
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
            alert("Password updated");
        }).catch(function (error) {
            console.log(error);
            alert("failed to update password");
        });
    }).catch(function (error) {
        // An error happened.
        console.log(error);
        alert("re-authentication failed. Check your old password entry and try again.");
    });
});


