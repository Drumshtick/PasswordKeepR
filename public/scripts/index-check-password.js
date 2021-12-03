$(document).ready(function() {
  const articles = $('article.password-entry');
  for (const article of articles) {
    let password = $(article).children('section.password-data')
    .children('div.data-wrapper.password').children('div.value-wrapper')
    .children('p.data-value').text();
    console.log(password);
    $.post('http://localhost:8080/checkPassword' , {password})
    .then((response) => {
      console.log(response);
    });
  }
});
