function redirectToLogin() {
  window.location.href = 'my-account.html';
}

document.body.addEventListener('click', redirectToLogin);
document.body.addEventListener('focus', redirectToLogin, true);

function performAction() {
  alert("You clicked the button, and now you're being redirected to login!");
  redirectToLogin();
}
