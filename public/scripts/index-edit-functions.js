$(document).ready(function() {

  $('button.changeToggle').on('click touchstart', function() {
    // If edit button is clicked and has the class edit treat as edit button
    // change edit button to save and add class save, remove class edit
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


      $(username).hide();
      $(username).parent().append('<input class="data data-value" type="text" name="username" class="form-control" value="'+$(username).text()+'">');
      $('div.data-wrapper.password').addClass('editMode');
      $('div.data-wrapper.password').children('div.title-wrapper').children('p').text('password    (click to edit)');

      $(password).hide();
      $(password).parent().append('<input class="data data-value" type="text" name="password-text" class="form-control" value="'+$(password).text()+'">');
      $('div.data-wrapper.username').addClass('editMode');
      $('div.data-wrapper.username').children('div.title-wrapper').children('p').text('username    (click to edit)');

      $(deleteButton).hide();
      $(deleteButton).siblings('button.cancel').show();

      $(editButton).removeClass('edit');
      $(editButton).addClass('save ');
      $(editButton).text('Save');
      return;
  }
  // if button has save class treat it as save button
  // and post updated password info
  if ($('button.changeToggle').hasClass('save')) {
    const targetParent =$(this).parent().parent();

    const username =$(targetParent).children('section.password-data')
    .children('div.data-wrapper.username').children('div.value-wrapper')
      .children('input.data').val();

      const password =$(targetParent).children('section.password-data')
      .children('div.data-wrapper.password').children('div.value-wrapper')
      .children('input.data').val();
      const url = $(targetParent).children('header').children('div').children('a').text();
      // AJAX POST
      // -----------------------------------------------
      $.post('http://localhost:8080/edit', {username, password, url})
      .then((response) => {
        if (typeof response !== 'object') {
          alert("SERVER ERROR contact admin");
          location.reload(true);
          return;
          }
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

            $(username).parent().children('p').text(response.username);
            $(username).parent().children('p').show();
            $(username).remove();

            $(password).parent().children('p').text(response.password);
            $(password).parent().children('p').show();
            $(password).remove();

            $(cancelButton).hide();
            $(cancelButton).siblings('button.delete').show();

            $(saveButton).removeClass('save btn-secondary');
            $(saveButton).text("Edit");
            $(saveButton).addClass('edit');

            $('div.data-wrapper.username').removeClass('editMode');
            $('div.data-wrapper.username').children('div.title-wrapper').children('p').text('username');

            $('div.data-wrapper.password').removeClass('editMode');
            $('div.data-wrapper.password').children('div.title-wrapper').children('p').text('password');

            return;
        }
      })
      .catch((err) => {console.log(err.message)});
      return;
    }
});


  $('button.noChange').on('click touchstart' ,function() {
    // cancels edit mode
    if($(this).hasClass('cancel')) {
      const cancelButton = $(this);
      const saveButton = $(this).siblings('button.changeToggle');
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

        $('div.data-wrapper.username').removeClass('editMode');
        $('div.data-wrapper.username').children('div.title-wrapper').children('p').text('username');

        $('div.data-wrapper.password').removeClass('editMode');
        $('div.data-wrapper.password').children('div.title-wrapper').children('p').text('password');

        $(password).parent().children('p').show();
        $(password).remove();
        // $(cancelButton).removeClass('cancel');
        $(cancelButton).hide();
        $(cancelButton).siblings('button.delete').show();
        // $(cancelButton).text('Delete');
        $(saveButton).removeClass('save btn-secondary');
        $(saveButton).text("Edit");
        $(saveButton).addClass('edit');
    }
  });
});






