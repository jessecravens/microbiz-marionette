// MicroBiz

// Mail Routing
// ------------

// Handle all of the routing needs related to mail
MicroBiz.Routing.MailRouting = (function(MicroBiz, Backbone){
  var MailRouting = {};

  // Router
  // ------

  // The mail router handles the incoming routes from the browser url, from
  // bookmarks, direct links and users typing directly in to the url.
  //
  // The router callbacks are only fired when the url hash is
  // directly hit, either by bookmark or manually changing
  // the hash. 
  //
  // Also note that the router is as dumb as possible. It only
  // calls out to other sub-app controlling objects, and lets
  // those objects do the real work.
  MailRouting.Router = MicroBiz.Routing.AppRouter.extend({
    appRoutes: {
      "": "showInbox",
      "inbox": "showInbox",
      "inbox/categories/:category": "showCategory",
      "inbox/:id": "showMessage"
    }
  });

  // Show route for the mail app.
  MicroBiz.vent.bind("mail:show", function(){
    MicroBiz.Routing.showRoute("inbox");
  });

  // Show route for the email message display
  MicroBiz.vent.bind("mail:message:show", function(message){
    MicroBiz.Routing.showRoute("inbox", message.id);
  });

  // Show route for mail categories that are being displayed.
  MicroBiz.vent.bind("mail:category:show", function(category){
    MicroBiz.Routing.showRoute("inbox", "categories", category);
  });

  // Initialization
  // --------------

  // Initialize the router when the application starts
  MicroBiz.addInitializer(function(){
    MailRouting.router = new MailRouting.Router({
      app: MicroBiz.MailApp
    });
  });

  return MailRouting;
})(MicroBiz, Backbone);
