$(document).ready(function() {
  const articles = $('article.password-entry');
  for (const article of articles) {
    const password = $(article).children('section.password-data')
    .children('div.data-wrapper.password').children('div.value-wrapper')
    .children('p.data-value').text();

    const target = $(article).children('section.password-data')
  .children('div.data-wrapper.breach').children('div.value-wrapper')
  .children('p.data-value');
    $.post('http://localhost:8080/checkPassword' , {password})
    .then((response) => {
      console.log(typeof response.results);
      if (response.results > 1) {
        target.parent('div.data-wrapper').addClass('breached');
      }
    });
  }
});
