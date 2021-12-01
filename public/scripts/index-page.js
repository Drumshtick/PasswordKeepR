$(document).ready(function() {
  // On click of clipboard in passwords data elements
  $('i.fa-clipboard').on("click", function() {
    // Get the element that was clicked
    const elementText = $(this).siblings(".value-wrapper")
      .children('.data-value')
      .text();
      //Get permission if user required permission for copying
      navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.clipboard.writeText(elementText).then(function() {
            alert(`"${elementText}" Copied to clipboard!`);
          });
        } else {
          alert('Permission denied: not allowed to copy to clipboard')
        }
      });
  });
});
