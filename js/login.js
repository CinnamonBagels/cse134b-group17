//Configuring the Auth0Widget will let your app work with Auth0:

$(document).ready(function() {
  var widget = new Auth0Widget({
    domain: 'oskar.auth0.com',
    clientID: 'EJi6h5XAuMmR8lh7cTwTqea1OO1oLZ2l',
    callbackURL: location.href,
    callbackOnLocationHash: true
  });
});

//Once the user clicks on the login button, 
//we'll call the signin method of Auth0's widget we've just created.
$('.btn-login').click(function(e) {
  e.preventDefault();
  widget.signin({ popup: true });
});

//Handling Login success and failure
var userProfile;

$('.btn-login').click(function(e) {
  e.preventDefault();
  widget.signin({ popup: true, null, function(err, profile, token) {
    if (err) {
      // Error callback
      alert('There was an error');
    } else {
      // Success calback

      // Save the JWT token.
      localStorage.setItem('userToken', token);

      // Save the profile
      userProfile = profile;
    }
  }});
});

//Configuring secure calls to your API
$.ajaxSetup({
  'beforeSend': function(xhr) {
    if (localStorage.getItem('userToken')) {
      xhr.setRequestHeader('Authorization',
            'Bearer ' + localStorage.getItem('userToken'));
    }
  }
});