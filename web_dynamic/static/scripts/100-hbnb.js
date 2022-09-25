$(document).ready(() => {
  $('input').css('margin-right', '10px');
  const dictState = {};
  $('.locations > .popover > ul > li > input').click(function () {
    if ($(this).is(':checked')) {
      dictState[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).is(':checked')) {
      delete dictState[$(this).attr('data-id')];
    }
    const listText = [];
    for (const i in dictState) {
      listText.push(dictState[i]);
    }
    $('.locations h4').text(listText.join(', '));
  });
  const dictCity = {};
  $('.locations > .popover > ul > li > ul > li > input').click(function () {
    if ($(this).is(':checked')) {
      dictCity[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).is(':checked')) {
      delete dictCity[$(this).attr('data-id')];
    }
    const listText = [];
    for (const i in dictCity) {
      listText.push(dictCity[i]);
    }
    $('.locations h4').text(listText.join(', '));
  });
  const dictAmenity = {};
  $('.amenities input').click(function () {
    if ($(this).is(':checked')) {
      dictAmenity[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).is(':checked')) {
      delete dictAmenity[$(this).attr('data-id')];
    }
    const listText = [];
    for (const i in dictAmenity) {
      listText.push(dictAmenity[i]);
    }
    $('.amenities h4').text(listText.join(', '));
  });
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: JSON.stringify({ states: Object.keys(dictState), cities: Object.keys(dictCity), amenities: Object.keys(dictAmenity) }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        $('article').remove();
        $(data).each(function (index) {
          $('.places').append('<article><div class="title_box"><h2>' + data[index].name + '</h2><div class="price_by_night">$' + data[index].price_by_night + '</div></div><div class="information"><div class="max_guest">' + data[index].max_guest + ' Guests</div><div class="number_rooms">' + data[index].number_rooms + ' Bedrooms</div><div class="number_bathrooms">' + data[index].number_bathrooms + ' Bathrooms</div></div><div class="description">' + data[index].description + '</div></article>');
        });
      }
    });
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
