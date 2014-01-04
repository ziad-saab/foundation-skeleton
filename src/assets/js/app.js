requirejs.config({
  paths: {
    jquery: 'vendors/jquery/jquery',
    foundation: 'vendors/foundation/foundation'
  },
  shim: {
    'foundation/foundation': ['jquery']
  }
});
require([
  'foundation/foundation'
], function() {
  $(document).foundation();
});