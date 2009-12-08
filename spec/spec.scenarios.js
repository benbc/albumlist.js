JSpec.describe('End-to-end scenarios', function() {
  it('shows the list of albums', function() {
    var albums = ['The Tipping Point',
                  'Black on Both Sides',
                  'Heartattack and Vine'];
    server().has(albums);
    albumlist.application(sandbox());
    albums.forEach(function(album) {
      user().shouldSee(album);
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

  user: function() {
    var include = matchers.include;
    return {
      shouldSee: function(album) {
        expect(jQuery('.album').text()).to(include, album);
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
