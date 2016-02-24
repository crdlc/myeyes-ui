!function(global) {
  'use strict';

  var USER = 'demo';
  var PASS = 'demo1';
  var DOMAIN = 'myeyes.com';

  var loginButton = null;
  var userNameField = null;
  var passwordField = null;
  var authErrorMessage = null;

  var checkStatus = function() {
    Utils.setDisabled(loginButton, !userNameField.value.trim() || !passwordField.value.trim());
    if (authErrorMessage.classList.contains('in')) {
      authErrorMessage.classList.remove('in');
    }
  };

  var onSuccess = function(response) {
    window.location.href = 'app.html';
  };

  var onError = function(evt) {
    authErrorMessage.hidden = false;
    authErrorMessage.classList.add('in');
  };

  var onLogin = function onSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (userNameField.value === USER && passwordField.value === PASS) {
      onSuccess();
    } else {
      onError();
    }
  };

  var init = function() {
    loginButton = document.querySelector('.btn-login');
    userNameField = document.getElementById('username');
    passwordField = document.getElementById('password');
    authErrorMessage = document.querySelector('.authentication-error');

    document.getElementById('usernameSuffix').textContent = '@' + DOMAIN;

    document.querySelector('form.login').addEventListener('input', checkStatus);
    loginButton.addEventListener('click', onLogin);
    checkStatus();
  };

  global.LoginView = {
    init: init,
    DOMAIN: DOMAIN
  };

}(this);
