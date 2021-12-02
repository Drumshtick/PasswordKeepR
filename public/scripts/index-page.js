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
    // On click of clipboard in passwords data elements
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
});
