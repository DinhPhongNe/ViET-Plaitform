function isUserLoggedIn() {
  return localStorage.getItem('login_status') === 'true';
}

function redirectToLogin() {
  if (!isUserLoggedIn()) {
    window.location.href = 'my-account.html';
  }
}

function handleRedirect(event) {
  const target = event.target;
  
  const redirectButtons = ['button1'];
  const redirectLinks = ['forceLogin'];
  
  if (redirectButtons.includes(target.id) || redirectLinks.includes(target.id)) {
    redirectToLogin();
  }
}

document.body.addEventListener('click', handleRedirect);

document.body.addEventListener('focus', handleRedirect, true);

function performAction() {
  console.log("You clicked the button, and now you're being redirected to login!");
  redirectToLogin();
}
