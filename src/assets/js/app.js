requirejs.config({
  paths: {
    jquery: 'vendors/jquery/dist/jquery',
    foundation: 'vendors/foundation/foundation',
    react: 'vendors/react/react'
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
