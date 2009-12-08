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
    return {
      has: function() {}
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
