JSpec.describe('End-to-end scenarios', function() {
  it('shows the list of albums', function() {
    var albums = ['The Tipping Point',
                  'Black on Both Sides',
                  'Heartattack and Vine'];
    server().has(albums);
    runApplication();
    albums.forEach(function(album) {
      user().shouldSee(album);
    });
  });
});

JSpec.include((function () {
  var sandbox = moduleUtil('jQuery', 'sandbox');
  var mockRequest = moduleUtil('Mock XHR', 'mockRequest');
  var include = matchers.include;
  var ui;
  return {
    name: 'ScenarioSupport',
    beforeSpec: function() {
      ui = sandbox();
    },
    utilities: {
      server: function() {
        return {
          has: function(albums) {
            mockRequest().and_return(JSpec.JSON.encode(albums));
          }
        };
      },

      runApplication: function() {
        albumlist.application(ui);
      },

      user: function() {
        return {
          shouldSee: function(album) {
            expect(ui.find('.album').text()).to(include, album);
          }
        };
      }
    }
  };

  function moduleUtil(module, util) {
    return findModule(module).utilities[util];
  }

  function findModule(name) {
    var module = null;
    JSpec.modules.forEach(function(m) {
      if (m.name == name) module = m;
    });
    return module;
  }
})());
