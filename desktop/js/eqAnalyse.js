
/* This file is part of Jeedom.
*
* Jeedom is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* Jeedom is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
*/
$('.nav-tabs a').on('shown.bs.tab', function (e) {
  window.location.hash = e.target.hash;
})
positionEqLogic();

$('#in_search').focus()

$('.alertListContainer .jeedomAlreadyPosition').removeClass('jeedomAlreadyPosition');
$('.batteryListContainer, .alertListContainer').packery({
  itemSelector: ".eqLogic-widget",
  gutter : 2
});

$('.alerts, .batteries').on('click',function(){
  setTimeout(function(){
    positionEqLogic();
    $('.batteryListContainer, .alertListContainer').packery({
      itemSelector: ".eqLogic-widget",
      gutter : 2
    });
  }, 10);
});

$('.cmdAction[data-action=configure]').on('click', function () {
  $('#md_modal').dialog({title: "{{Configuration commande}}"});
  $('#md_modal').load('index.php?v=d&modal=cmd.configure&cmd_id=' + $(this).attr('data-cmd_id')).dialog('open');
});

//searching
$('#in_search').off('keyup').on('keyup',function(){
  var search = $(this).value()
  if (search == '') {
    $('.eqLogic-widget').show()
    $('.batteryListContainer').packery()
    return
  }

  search = search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  $('.eqLogic-widget').each(function() {
    var match = false

    text = normText($(this).find('.widget-name').text())
    if (text.indexOf(search) >= 0) match = true

    text = normText($(this).find('.widget-name span').text())
    if (text.indexOf(search) >= 0) match = true

    if(match) {
      $(this).show()
    } else {
      $(this).hide()
    }
  });
  $('.batteryListContainer').packery();
});

function normText(_text) {
  return _text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

$('#bt_resetSearch').on('click', function () {
  $('#in_search').val('')
  $('#in_search').keyup();
})
