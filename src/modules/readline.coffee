require.module 'readline', (module, exports, require) ->
  module.exports = 
    question: (query, callback) -> callback prompt query
