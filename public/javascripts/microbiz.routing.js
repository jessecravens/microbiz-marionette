// MicroBiz

// Routing
// -------

MicroBiz.Routing = (function(MicroBiz, Backbone){
  var Routing = {};

  // AppRouter
  // ---------
  
  // The AppRouter object is a work-in-progress to reduce the
  // boilerplate code in routers. It requires an `app` object
  // be provided to the constructor, and `appRoutes` hash to be
  // defined on the router. 
  //
  // The left part of the `appRoutes` is a standard Backbone route. 
  // The right part of the `appRoutes` is the name of the method to 
  // call on the `app` object, when the route callback fires. 
  //
  // For example:
  // `appRoutes: { "foo/bar": "bar"}` will call the `bar` 
  // method on the `app` object: `new MyRouter({app: fooApp});`

  Routing.AppRouter = Backbone.Router.extend({

    constructor: function(options){
      Backbone.Router.prototype.constructor.call(this, options);

      if (this.appRoutes){
        this.processAppRoutes(options.app, this.appRoutes);
      }
    },

    processAppRoutes: function(app, appRoutes){
	  console.log('processAppRoutes(app, appRoutes) ');
	  console.log('- processAppRoutes app: ' + app);
	  console.log(app);
	
	  console.log('- processAppRoutes appRoutes: ' + appRoutes);
	  console.log(appRoutes);
	
      var method, methodName;
      var route, routesLength;
      var routes = [];
      var router = this;

      for(route in appRoutes){
        routes.unshift([route, appRoutes[route]]);
      }

      routesLength = routes.length;
      for (var i = 0; i < routesLength; i++){

        route = routes[i][0];
        methodName = routes[i][1];
		// console.log('methodName: ');
		// console.log(methodName);
		
        method = app[methodName];
        router.route(route, methodName, method);

      }
    }

  });

  // Public API
  // ----------

  // The `showRoute` method is a private method used to update the 
  // url's hash fragment route. It accepts a base route and an 
  // unlimited number of optional parameters for the route: 
  // `showRoute("foo", "bar", "baz", "etc");`.
  Routing.showRoute = function(){
    var route = getRoutePath(arguments);
    Backbone.history.navigate(route, false);
  };

  // Helper Methods
  // --------------

  // Creates a proper route based on the `routeParts`
  // that are passed to it.
  var getRoutePath = function(routeParts){
    var base = routeParts[0];
    var length = routeParts.length;
    var route = base;

    if (length > 1){
      for(var i = 1; i < length; i++) {
        var arg = routeParts[i];
        if (arg){
          route = route + "/" + arg;
        }
      }
    }

    return route;
  }

  return Routing;
})(MicroBiz, Backbone);
