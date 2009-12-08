var albumlist = {};

albumlist.application = function(ui) {
  jQuery.getJSON('/album/all', function(data) {
    data.forEach(function(album) {
      
    });
  });
};
