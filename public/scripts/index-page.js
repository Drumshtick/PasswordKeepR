$(document).ready(function() {
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
            alert(`"${elementText}" Copied to clipboard!`);
          });
        } else {
          alert('Permission denied: not allowed to copy to clipboard')
        }
      });
  });

  $('button.changeToggle').on('click touchstart', function() {
    if ($(this).hasClass('edit')) {
    const editButton = $(this);
    const deleteButton = $(this).siblings('button.delete');
      // When edit button is clicked
      // create input fields and changed edit to save button
      const targetParent =$(this).parent().parent();

      const username =$(targetParent).children('section.password-data')
      .children('div.data-wrapper.username').children('div.value-wrapper')
      .children('p.data-value');


      const password =$(targetParent).children('section.password-data')
      .children('div.data-wrapper.password').children('div.value-wrapper')
      .children('p.data-value');


      $(username).parent().append('<input class="data data-value" type="text" name="username" class="form-control" value="'+$(username).text()+'">');
      $(username).hide();
      $(password).hide();
      $(password).parent().append('<input class="data data-value" type="text" name="password-text" class="form-control" value="'+$(password).text()+'">');
      $(deleteButton).addClass('cancel');
      $(deleteButton).text('Cancel');
      $(editButton).removeClass('edit');
      $(editButton).addClass('save btn-secondary');
      $(editButton).text('Save');
      return;
  }
  if ($('button.changeToggle').hasClass('save')) {
    const targetParent =$(this).parent().parent();

    const username =$(targetParent).children('section.password-data')
    .children('div.data-wrapper.username').children('div.value-wrapper')
      .children('input.data').val();

      const password =$(targetParent).children('section.password-data')
      .children('div.data-wrapper.password').children('div.value-wrapper')
      .children('input.data').val();
      const url = $(targetParent).children('header').children('div').children('a').text();

      $.post('http://localhost:8080/edit', {username, password, url})
      .then((response) => {
        console.log(response);
        const cancelButton = $('button.cancel');
        const saveButton = $('button.save');
        if (cancelButton.hasClass('cancel')) {
          // When edit button is clicked
          // create input fields and changed edit to save button
          const targetParent =$(this).parent().parent();

          const username =$(targetParent).children('section.password-data')

          .children('div.data-wrapper.username').children('div.value-wrapper')
          .children('input.data-value');

          const password =$(targetParent).children('section.password-data')
          .children('div.data-wrapper.password').children('div.value-wrapper')
          .children('input.data-value');


          $(username).parent().children('p').show();
          $(username).remove();
          $(password).parent().children('p').show();
          $(password).remove();
          $(cancelButton).removeClass('cancel');
          $(cancelButton).text('Delete');
          $(saveButton).removeClass('save btn-secondary');
          $(saveButton).text("Edit");
          return;
        }
      })
      .catch((err) => {console.log(err.message)});
      return;
    }
});

  // // Event listener for save button to make the POST
  // $('button.changeToggle').on('click', function() {

  // });
  $('button.noChange').on('click touchstart' ,function() {
    const cancelButton = $(this);
    const saveButton = $(this).siblings('button.changeToggle');
    if (cancelButton.hasClass('cancel')) {
      // When edit button is clicked
      // create input fields and changed edit to save button
      const targetParent =$(this).parent().parent();

      const username =$(targetParent).children('section.password-data')
      .children('div.data-wrapper.username').children('div.value-wrapper')
      .children('input.data-value');

      const password =$(targetParent).children('section.password-data')
      .children('div.data-wrapper.password').children('div.value-wrapper')
      .children('input.data-value');


      $(username).parent().children('p').show();
      $(username).remove();
      $(password).parent().children('p').show();
      $(password).remove();
      $(cancelButton).removeClass('cancel');
      $(cancelButton).text('Delete');
      $(saveButton).removeClass('save btn-secondary');
      $(saveButton).text("Edit");
    }
  });
});






