// MicroBiz

// Worktasks Routing
// ------------

// Handle all of the routing needs related to locations, etc.
MicroBiz.Routing.WorktasksRouting = (function(MicroBiz, Backbone){
  var WorktasksRouting = {};

  // Router
  // ------

  // The worktasks router handles the incoming routes from the browser url, from
  // bookmarks, direct links and users typing directly in to the url.
  //
  // The router callbacks are only fired when the url hash is
  // directly hit, either by bookmark or manually changing
  // the hash. 
  //
  // Also note that the router is as dumb as possible. It only
  // calls out to other sub-app controlling objects, and lets
  // those objects do the real work.

  WorktasksRouting.Router = MicroBiz.Routing.AppRouter.extend({
    appRoutes: {
      "worktasks": "showBehaviorLogList",
	  "worktasks/*path": "showBehaviorLogList"
    }
  });
  // 
  // Show route for the worktasks app
  MicroBiz.vent.bind("behaviorlogs:show", function(){
	//var company = $(".Companies").find(':selected').data('selector');
    var company = MicroBiz.WorkTasksApp.Selectors.getSelectersCurrentStateByName('company');
    var trimmed = company.replace(/\s/g, "") ;
	MicroBiz.Routing.showRoute("worktasks", trimmed);
  });
  
  // Initialization
  // --------------
  
  // Initialize the router when the application starts
  MicroBiz.addInitializer(function(){
    WorktasksRouting.router = new WorktasksRouting.Router({
      app: MicroBiz.WorkTasksApp
    });
  });

  return WorktasksRouting;
})(MicroBiz, Backbone);