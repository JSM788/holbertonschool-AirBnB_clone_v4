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

$.getJSON('http://127.0.0.1:5001/api/v1/status/',
  function (data) {
    if (data.status === 'OK') {
      $('div#api_status').css('background-color', '');
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
      $('div#api_status').css('background-color', '#CCCCCC');
    }
  });

$.ajax({
  type: 'POST',
  url: 'http://127.0.0.1:5001/api/v1/places_search',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    $(data).each(function (index) {
      $('.places').append('<article><div class="title_box"><h2>' + data[index].name + '</h2><div class="price_by_night">$' + data[index].price_by_night + '</div></div><div class="information"><div class="max_guest">' + data[index].max_guest + ' Guests</div><div class="number_rooms">' + data[index].number_rooms + ' Bedrooms</div><div class="number_bathrooms">' + data[index].number_bathrooms + ' Bathrooms</div></div><div class="description">' + data[index].description + '</div></article>');
    });
  }
});
