
!function(global) {
  'use strict';

  var model = null;
  var form = null;
  var button = null;
  var message = null;
  var messageSent = null;

  var checkStatus = function() {
    Utils.setDisabled(button, !message.value.trim());
    if (messageSent.classList.contains('in')) {
      messageSent.classList.remove('in');
    }
  };

  var init = function(pModel) {
    if (model) {
      return;
    }

    model = pModel;
    form = document.querySelector('form.form-message');
    button = document.getElementById('sendMessage');
    message = document.getElementById('messageValue');
    messageSent = document.querySelector('.message-sent');

    form.addEventListener('input', checkStatus);
    button.addEventListener('click', function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      model.message = message.value.trim();
      form.reset();
      checkStatus();
      messageSent.hidden = false;
      messageSent.classList.add('in');
    });
  };

  global.ChatView = {
    init: init
  };

}(this);
