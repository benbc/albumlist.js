load('gems/gems/jspec-2.11.13/spec/env.js');
Envjs('spec/fixture.html', { logLevel: Envjs.NONE });
load('lib/jquery.js');
load('gems/gems/jspec-2.11.13/lib/jspec.js');
load('gems/gems/jspec-2.11.13/lib/jspec.jquery.js');
load('gems/gems/jspec-2.11.13/lib/jspec.xhr.js');
load('lib/albumlist.core.js');

JSpec
.exec('spec/spec.core.js')
.exec('spec/spec.scenarios.js')
.run({ formatter: JSpec.formatters.Terminal })
.report();
