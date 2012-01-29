// MicroBiz

// Contacts Routing
// ------------

// Handle all of the routing needs related to contacts
MicroBiz.Routing.ContactsRouting = (function(MicroBiz, Backbone){
  var ContactsRouting = {};

  // Router
  // ------

  // The contacts router handles the incoming routes from the browser url, from
  // bookmarks, direct links and users typing directly in to the url.
  //
  // The router callbacks are only fired when the url hash is
  // directly hit, either by bookmark or manually changing
  // the hash. 
  //
  // Also note that the router is as dumb as possible. It only
  // calls out to other sub-app controlling objects, and lets
  // those objects do the real work.
  ContactsRouting.Router = MicroBiz.Routing.AppRouter.extend({
    appRoutes: {
      "contacts": "showContactList"
    }
  });

  // Show route for the contacts app
  MicroBiz.vent.bind("contacts:show", function(){
    MicroBiz.Routing.showRoute("contacts");
  });

  // Initialization
  // --------------

  // Initialize the router when the application starts
  MicroBiz.addInitializer(function(){
    ContactsRouting.router = new ContactsRouting.Router({
      app: MicroBiz.ContactsApp
    });
  });

  return ContactsRouting;
})(MicroBiz, Backbone);

