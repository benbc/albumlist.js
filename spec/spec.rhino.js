
load('gems/gems/jspec-2.11.13/lib/jspec.js')
load('lib/albumlist.core.js')

JSpec
.exec('spec/spec.core.js')
.exec('spec/spec.scenarios.js')
.run({ formatter: JSpec.formatters.Terminal })
.report()