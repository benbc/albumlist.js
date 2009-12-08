var albumlist = {};

albumlist.application = function(ui) {
  jQuery.getJSON('/album/all', function(data) {
    data.forEach(function(album) {
      ui.append('<p class="album">'+album+'</p>');
    });
  });
};
