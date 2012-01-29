// MicroBiz

// MicroBiz Application / Namespace
// -----------------------------------

// This is the primary application definition and
// application namespace. It's important to keep
// the JavaScript global scope clean, so everything
// we will do hangs off the 'Application' instance.
MicroBiz = new Backbone.Marionette.Application();

// These are my visual regions: the "navigation" or
// left hand list of categories, and the "main"
// content area where the email list or contact list
// is displayed.
MicroBiz.addRegions({
  navigationRegion: "#navigation",
  mainRegion: "#main"
});

// This kicks off after all of my other application
// initializers have fired, and starts the Backbone
// history. Doing that fires off the router's route
// based on the #hash fragment in the URL, and gets
// the app up and running in the correct mode.
MicroBiz.bind("initialize:after", function(){
  if (Backbone.history){
    Backbone.history.start();
  }
});
