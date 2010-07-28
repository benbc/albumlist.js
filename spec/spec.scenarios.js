
JSpec.describe('End-to-end scenarios', function() {
  it('shows the list of albums', function() {
    // given
    var albums = [{title: 'The Tipping Point', artist: 'The Roots'},
                  {title: 'Black on Both Sides', artist: 'Mos Def'},
                  {title: 'Heartattack and Vine', artist: 'Tom Waites'}];
    server().has(albums);
    // when
    runApplication();
    // then
    user().shouldSee(albums);
    // when
    user().clicksOn('The Tipping Point');
    // then
    user().shouldSeeDetails({
      title: 'The Tipping Point',
      artist: 'The Roots'
    });
  });
});

JSpec.include((function () {
  var sandbox = moduleUtil('jQuery', 'sandbox');
  var mockRequest = moduleUtil('Mock XHR', 'mockRequest');
  var m = matchers;
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
          clicksOn: function(album) {
            ui.find('.album').click();
          },
          shouldSee: function(albums) {
            ui.find('.album').each(function(i, album) {
              expect(jQuery(album).text()).to(m.equal, albums[i].title);
            });
          },
          shouldSeeDetails: function(details) {
            expect(ui.find('.title').text()).to(m.equal, details.title);
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
