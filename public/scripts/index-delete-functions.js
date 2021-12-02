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
    $('button.remove-from-db').on('click', function() {
        $('div.modal-body').children('h6').text("Are you absolutely certain?");
        $('div.modal-body').children('h6').addClass('strong')
        $('div.modal-body').children('p').hide();
        $('#yes').show();
        $('button.remove-from-db').hide();
        return;
      });
      return;
    });

    // Second promopt in modal (confirms delete)
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
            $(CURRENT_TARGET_PARENT).remove();
            if ($('main').children().length === 0) {
              $('main').append(NO_STORED_PASSWORDS);
            }
            setTimeout(() => {
              $('#exampleModal').modal('toggle');
              setTimeout(() => {
                $('div.modal-body').children('h6').text("Are you sure you want to delete");
                $('div.modal-body').children('h6').removeClass('strong');
                $('div.modal-body').children('p').show();
                $('#yes').hide();
                $('button.remove-from-db').show();

                return
              },1000);
            }, HIDE_MODAL_DELAY);
          }
          return;
        });
        return;
    });
});
