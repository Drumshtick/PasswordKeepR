$(document).ready(function() {
  // Stores parent of element that the delete button was clicked
  // Used to send relevant data with POST
  let CURRENT_TARGET_PARENT;
  const HIDE_MODAL_DELAY = 1500;
  const NO_STORED_PASSWORDS = `
  <main>
  <article class="no-entries card">
    <header class="url">
      <i class="fas fa-exclamation-triangle"></i>
      <h4>You have no passwords stored</h1>
      </header>
      <section>
        <h4>To get started, create an entry</h6>
          <a href="/password_gen"><button type="button" class="btn btn-primary">Here</button></a>
        </section>
      </article>
    </main>
  `;
  // first delete button on modal (initial)
  $('button.delete').on('click', function() {
      CURRENT_TARGET_PARENT = $(this).parent().parent();
      $('#exampleModal').modal('toggle');
      return;
    });

    $('button.remove-from-db').on('click', function() {
      $('div.modal-body').children('h6').text("Are you absolutely certain?");
      $('div.modal-body').children('h6').addClass('strong')
      $('div.modal-body').children('p').hide();
      $('#yes').show();
      $('button.remove-from-db').hide();
      return;
    });

    // Second prompt in modal (confirms delete)
    // sends post
    $('#yes').on('click', function() {
      const url = $(CURRENT_TARGET_PARENT).children('header').children('div').children('a').text();
      const username =$(CURRENT_TARGET_PARENT).children('section.password-data')
      .children('div.data-wrapper.username').children('div.value-wrapper')
        .children('p.data-value').text();
        $.post('http://localhost:8080/delete', {username, url})
        .then((response) => {

          if (response === 'OK') {
            $('div.modal-body').children('h6').text("SUCCESS");
            $('#yes').attr('disabled', 'disabled');
            $('div.modal-footer').children('button.btn-secondary').attr('disabled', 'disabled');
            $(CURRENT_TARGET_PARENT).remove();
            // If no passwords on DOM render message
            // with link to create a password
            if ($('main').children().length === 0) {
              $('main').append(NO_STORED_PASSWORDS);
            }
            setTimeout(() => {
              $('#exampleModal').modal('toggle');
              setTimeout(() => {
                // Reset modal to initial state
                $('div.modal-body').children('h6').text("Are you sure you want to delete");
                $('div.modal-body').children('h6').removeClass('strong');
                $('div.modal-body').children('p').show();
                $('#yes').hide();
                $('button.remove-from-db').show();
                $('#yes').removeAttr('disabled');
                $('div.modal-footer').children('button.btn-secondary').removeAttr('disabled');
                return
              },1000);
            }, HIDE_MODAL_DELAY);
            return;
          }
            // If error
            $('div.modal-body').children('h6').text("FAILED: INTERNAL SERVER ERROR CONTACT ADMINISTRATOR");
            setTimeout(() => {location.reload(true)}, HIDE_MODAL_DELAY)
          return;
        });
        return;
    });
});
