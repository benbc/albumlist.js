JSpec.describe('End-to-end scenarios', function() {
  it('shows the list of albums', function() {
    var albums = ['The Tipping Point',
                  'Black on Both Sides',
                  'Heartattack and Vine'];
    server().has(albums);
    var s = sandbox();
    albumlist.application(s);
    albums.forEach(function(album) {
      user(s).shouldSee(album);
    });
  });
});

JSpec.include({ utilities: {
  server: function() {
    var mockRequest = findModule('Mock XHR').utilities.mockRequest;
    return {
      has: function(albums) {
        mockRequest().and_return(JSpec.JSON.encode(albums));
      }
    };
  },

  user: function(ui) {
    var include = matchers.include;
    return {
      shouldSee: function(album) {
        expect(ui.find('.album').text()).to(include, album);
      }
    };
  }
}});

function findModule(name) {
  var module = null;
  JSpec.modules.forEach(function(m) {
    if (m.name == name) module = m;
  });
  return module;
}
