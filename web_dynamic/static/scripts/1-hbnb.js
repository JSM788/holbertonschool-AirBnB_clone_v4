$(document).ready(() => {
  $('input').css('margin-right', '10px');
  const dictResult = {};
  $('input').click(function () {
    if ($(this).is(':checked')) {
      dictResult[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).is(':checked')) {
      delete dictResult[$(this).attr('data-id')];
    }
    const listText = [];
    for (const i in dictResult) {
      listText.push(dictResult[i]);
    }
    $('.amenities h4').text(listText.join(', '));
  });
});
