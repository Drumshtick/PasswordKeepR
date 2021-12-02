$(document).ready(function() {
  const fillAlert = function (notification) {
    console.log("ran!");
    $('#alert_placeholder').html('<div class="alert alert-primary" role="alert" style="position:abolute;z-index:999;">' + notification + '</div>');
  };
  const fillAlertError = function (notification) {
    console.log("ran!");
    $('#alert_placeholder').html('<div class="alert alert-danger" role="alert" style="position:abolute;z-index:999;">' + notification + '</div>');
  };
  const dismissAlert = function () {
    window.setTimeout(function () {
      $(".alert").fadeTo(600, 0).slideUp(600, function () {
        $(this).remove();
      });
    }, 3000);
  };

  // On click of clipboard in passwords data elements
  $('i.fa-clipboard').on("click touchstart", function() {
    // Get the element that was clicked
    const elementText = $(this).siblings(".value-wrapper")
      .children('.data-value')
      .text();
      //Get permission if user required permission for copying
      navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.clipboard.writeText(elementText).then(function() {
            const notification = `"${elementText}" Copied to clipboard!`;
            fillAlert(notification);
           dismissAlert();
          });
        } else {
          fillAlertError('Permission denied: not allowed to copy to clipboard');
          dismissAlert();
        }
      });
  });

$('button.edit').on('click touchstart', function() {

  const targetParent =$(this).parent().parent();
  const username =$(targetParent).children('section.password-data')
  .children('div.data-wrapper.username').children('div.value-wrapper')
  .children('p.data-value');

  const password =$(targetParent).children('section.password-data')
  .children('div.data-wrapper.password').children('div.value-wrapper')
  .children('p.data-value');

  const button = $(this);
  $(username).replaceWith('<input class="data" type="text" name="username" class="form-control" value="'+$(username).text()+'">');
  $(password).replaceWith('<input class="data" type="text" name="password-text" class="form-control" value="'+$(password).text()+'">');
  $(button).replaceWith('<button type="button" style="background-color: purple;" class="edit save btn btn-primary">Save</button>');
  $('button.save').on('click', function() {
  const targetParent =$(this).parent().parent();
  const username =$(targetParent).children('section.password-data')
    .children('div.data-wrapper.username').children('div.value-wrapper')
    .children('input.data').val();

  const password =$(targetParent).children('section.password-data')
    .children('div.data-wrapper.password').children('div.value-wrapper')
    .children('input.data').val();
  const url = $(targetParent).children('header').children('div').children('a').text();

  console.log("values: ", username, password);
$.post('http://localhost:8080/edit', {username, password, url})
  .then((response) => {console.log(response)})
  .catch((err) => {console.log(err.message)})
});
});


});






