// MicroBiz

// Worktasks.Filters
// ------------------

// The list of filters for behaviorlogs. 

MicroBiz.WorkTasksApp.Filters = (function(MicroBiz, Backbone, $){
  var Filters = {};

  var Filter = Backbone.Model.extend({});

  var LocationFilterCollection = Backbone.Collection.extend({
    model: Filter
  });
  var JoblistFilterCollection = Backbone.Collection.extend({
    model: Filter
  });
  var UserFilterCollection = Backbone.Collection.extend({
    model: Filter
  });
  var AssetFilterCollection = Backbone.Collection.extend({
    model: Filter
  });
  var TimeFilterCollection = Backbone.Collection.extend({
    model: Filter
  });

  // Worktask Filter Views
  // -------------------

  // The view to show the list of filters. The view
  // template includes the standard Filter Titles hard coded
  // and then it renders the individual filters.

  Filters.FiltersView = MicroBiz.ItemView.extend({
    template: "#worktasks-filters-view-template",

    events: {
      "click a": "filterClicked"
    },

    // Raise an event aggregator event, to say that a
    // particular filter was clicked, and let the other
    // parts of the system figure out how to respond.
    filterClicked: function(e){
      e.preventDefault();
      var filter = $(e.currentTarget).data("filter");
      if (filter){
	
		// here instead of passing a simple filter or category - we may need to pass an object or array of objects
		// There surely will be a trickle effect when a filter is selected. 
		// Also need to consider defaults - none or all - Date being a exception
		// Companies - should be first company
		// Locations - all
		// joblists - all
		// users - all 
		// assets - all
		// time - this week
		// so when a company is selected
		
		// filter will probably drive the switch statement which can then drive the custom events... such as
		
		// switch (filter){
		// case 'companies':
		// 	MicroBiz.vent.trigger("behaviorlogs:filter:show", filter);
		//   break;
		// case 'locations':
		// 
		//   break;
		// case 'joblists':
		// 
		//   break;
		// case 'users':
		// 
		//   break;
		// case 'assets':
		// 
		//   break;
		// default:
			
		
        MicroBiz.vent.trigger("behaviorlogs:filter:show", filter);
      } else {
        MicroBiz.vent.trigger("behaviorlogs:show");
      }
    }
  });

  Filters.LocationFiltersView = MicroBiz.ItemView.extend({
    template: "#worktasks-location-filters-view-template",

    events: {
      "click .checkbox-location": "filterClicked"
    },

    filterClicked: function(e){
      var filter = $(e.currentTarget).data("filter");
			
		var stateLocArr = getFiltersStateArray('location');
		
		if (_.indexOf(stateLocArr, filter) != -1){
			var index = stateLocArr.indexOf(filter);
			stateLocArr.splice(index, 1);
		}
		else {
			stateLocArr.push(filter);
		};
	    MicroBiz.vent.trigger("state:worktasks:filters:changed");
    }
  });

  Filters.JoblistFiltersView = MicroBiz.ItemView.extend({
    template: "#worktasks-joblist-filters-view-template",

    events: {
      "click a": "filterClicked"
    },

    filterClicked: function(e){
      e.preventDefault();
      var filter = $(e.currentTarget).data("filter");
      if (filter){		
        MicroBiz.vent.trigger("behaviorlogs:filter:show", filter);
      } else {
        MicroBiz.vent.trigger("behaviorlogs:show");
      }
    }
  });

  Filters.UserFiltersView = MicroBiz.ItemView.extend({
    template: "#worktasks-user-filters-view-template",

    events: {
      "click a": "filterClicked"
    },

    filterClicked: function(e){
      e.preventDefault();
      var filter = $(e.currentTarget).data("filter");
      if (filter){		
        MicroBiz.vent.trigger("behaviorlogs:filter:show", filter);
      } else {
        MicroBiz.vent.trigger("behaviorlogs:show");
      }
    }
  });

  Filters.AssetFiltersView = MicroBiz.ItemView.extend({
    template: "#worktasks-asset-filters-view-template",

    events: {
      "click a": "filterClicked"
    },

    filterClicked: function(e){
      e.preventDefault();
      var filter = $(e.currentTarget).data("filter");
      if (filter){		
        MicroBiz.vent.trigger("behaviorlogs:filter:show", filter);
      } else {
        MicroBiz.vent.trigger("behaviorlogs:show");
      }
    }
  });

  Filters.TimeFiltersView = MicroBiz.ItemView.extend({
    template: "#worktasks-time-filters-view-template",

    events: {
      "click a": "filterClicked"
    },

    filterClicked: function(e){
      e.preventDefault();
      var filter = $(e.currentTarget).data("filter");
      if (filter){		
        MicroBiz.vent.trigger("behaviorlogs:filter:show", filter);
      } else {
        MicroBiz.vent.trigger("behaviorlogs:show");
      }
    }
  });


  // Filters Helper Methods
  // ----------------------------

  // If necesary, Do some processing on your onbjects before sending to view. 
  // Transform initial JSON to collections of filter models
  var buildFilters = function(filterType, obj, state){	
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! buildFilters');

	switch (filterType){
	case 'locations':
		console.log('filterType:' + filterType);
		var filter;
		var filterCollection = new LocationFilterCollection();
		
		// SCOPE the current companies
		
		// convert selectors_state (Collection) into an array
		var stateArr = _.toArray(MicroBiz.WorkTasksApp.selectors_state);
		console.log(stateArr);
		
		// use _.find() to get the model with a 'name' attribute == to 'company' out of the state array
		var stateCompObj = _.find(stateArr,
			function(ob) {
		  		return ob.get('name') == "company";
			});
		
		// grab that array
		var stateCompArr = stateCompObj.get('items');
		
		_.each(obj, function(companies){
				
				console.log('INSIDE COMPANIES')
				console.log(companies.name)
				console.log(_.indexOf(stateCompArr, companies.name) != -1);
				
			if (_.indexOf(stateCompArr, companies.name) != -1) {		
				_.each(companies.locations, function(locations){
					
					console.log('STATE - locations');
					console.log(typeof state);
					console.log(locations)
					
					// convert filters_state (Collection) into an array
					var stateArr = _.toArray(state);
					console.log(stateArr);
					
					// use _.find() to get the model with a 'name' attribute == to 'location' out of the state array
					var stateLocObj = _.find(stateArr,
						function(ob) {
					  		return ob.get('name') == "location";
						});
					
					// console.log(stateLocObj.get('items'));
					
					// grab that array
					var stateLocArr = stateLocObj.get('items');			
					
					// Build the filter models and eventually add them to the filter Collection
					// if locations.name is present in the stateLocObj
					if (_.indexOf(stateLocArr, locations.name) != -1) {
					    // then set the css hidden class to false or show it
					    filter = new Filter({
					        name: locations.name,
					        company_name: companies.name,
					        hidden: false
					    });
					 } else {
					    filter = new Filter({
					        name: locations.name,
					        company_name: companies.name,
					        hidden: true
					    });
					 };
					 // add the new filter model to the collection
					 filterCollection.add(filter);
				});
		    }; // no else necessary as of now
		
		});
		// console.log(filterCollection);
		return filterCollection;
	  break;
	case 'joblists':
		console.log('filterType:' + filterType);
		var filter;
		var filterCollection = new JoblistFilterCollection();
		_.each(obj, function(companies){
		  console.log('within JoblistFilterCollection parse');
		  console.log(companies.name)

				_.each(companies.joblists, function(joblists){
					
					console.log('STATE - joblists');
					console.log(typeof state);
					console.log(joblists)
					
					// convert filters_state (Collection) into an array
					var stateArr = _.toArray(state);
					console.log(stateArr);
					
					// use _.find() to get the model with a 'name' attribute == to 'location' out of the state array
					var stateJobObj = _.find(stateArr,
						function(ob) {
					  		return ob.get('name') == "joblist";
						});
					
					// console.log(stateLocObj.get('items'));
					
					var stateJobArr = stateJobObj.get('items');			
					
					// Build the filter models and eventually add them to the filter Collection
					// if joblists.name is present in the statelObj
					if (_.indexOf(stateJobArr, joblists.name) != -1) {
					    // then set the css hidden class to false
					    filter = new Filter({
					        name: joblists.name,
					        company_name: companies.name,
					        hidden: false
					    });
					 } else {
					    filter = new Filter({
					        name: joblists.name,
					        company_name: companies.name,
					        hidden: true
					    });
					 };
					 // add the new filter model to the collection
					 filterCollection.add(filter);
				});
		});
		return filterCollection;
	  break;
	case 'users':
		console.log('filterType:' + filterType);
		var filter;
		var filterCollection = new UserFilterCollection();
		_.each(obj, function(companies){
		  console.log('within UserFilterCollection parse');
		  console.log(companies.name)

				_.each(companies.users, function(users){
					// console.log(companies)
					console.log(users.name)
		  			filter = new Filter({name: users.name, company_name: companies.name});
		  			console.log(filter)	
		  			filterCollection.add(filter);
				});
		});
		return filterCollection;
	  break;
	case 'assets':
		console.log('filterType:' + filterType);
		var filter;
		var filterCollection = new AssetFilterCollection();
		_.each(obj, function(companies){
		  console.log('within AssetFilterCollection parse');
		  console.log(companies.name)

				_.each(companies.assets, function(assets){
					// console.log(companies)
					console.log(assets.name)
		  			filter = new Filter({name: assets.name, company_name: companies.name});
		  			console.log(filter)	
		  			filterCollection.add(filter);
				});
		});
		return filterCollection;
	  break;
	case 'time':
		console.log('filterType:' + filterType);
		var filter;
		var filterCollection = new TimeFilterCollection();
		_.each(obj, function(companies){
		  console.log('within TimeFilterCollection parse');
		  console.log(companies.name)

				_.each(companies.time, function(time){
					// console.log(companies)
					console.log(time.start)
		  			filter = new Filter({start: time.start, end: time.end, company_name: companies.name});
		  			console.log(filter)	
		  			filterCollection.add(filter);
				});
		});
		return filterCollection;
	  break;
	default:

	};
  };


  var getFiltersStateArray = function(type){
	
		var filters_state = MicroBiz.WorkTasksApp.filters_state;
		var stateArr = _.toArray(filters_state);

		// use _.find() to get the model with a 'name' attribute == to get an obj of type out of the state array
		var stateObj = _.find(stateArr,
			function(ob) {
		  		return ob.get('name') == type;
			});

		var stateItemsArr = stateObj.get('items');
		return stateItemsArr;
	};

  // Filters Public API
  // --------------------------
  
  // Show the filters list - called from 
  Filters.showFilterList = function(){

 	// console.log('Is CompanyFilterCollection built?'); 
 	// console.log(Filters.CompanyFilterCollection);

    console.log('Is the current LocationFilterCollections built?'); 
 	console.log(Filters.LocationFilterCollection);

    console.log('Is the current JoblistFilterCollections built?'); 
 	console.log(Filters.JoblistFilterCollection);

    console.log('Is the current UserFilterCollection built?'); 
 	console.log(Filters.UserFilterCollection);

    console.log('Is the current AssetFilterCollection built?'); 
 	console.log(Filters.AssetFilterCollection);

    console.log('Is the current TimeFilterCollection built?'); 
 	console.log(Filters.TimeFilterCollection);

    var locationFilterView = new Filters.LocationFiltersView({
      collection: Filters.LocationFilterCollection
    });
    var joblistFilterView = new Filters.JoblistFiltersView({
      collection: Filters.JoblistFilterCollection
    });
    var userFilterView = new Filters.UserFiltersView({
      collection: Filters.UserFilterCollection
    });
    var assetFilterView = new Filters.AssetFiltersView({
      collection: Filters.AssetFilterCollection
    });
    var timeFilterView = new Filters.TimeFiltersView({
      collection: Filters.TimeFilterCollection
    });

    MicroBiz.LocationFilterRegion.show(locationFilterView);
    MicroBiz.JoblistFilterRegion.show(joblistFilterView);
    MicroBiz.UserFilterRegion.show(userFilterView);
    MicroBiz.AssetFilterRegion.show(assetFilterView);
    MicroBiz.TimeFilterRegion.show(timeFilterView);
  };

  // Worktasks Filters Event Handlers
  // -----------------------

  MicroBiz.vent.bind("state:worktasks:filters:changed", function(){
    console.log('state:worktasks:filters:changed');
	Filters.LocationFilterCollection = buildFilters('locations', MicroBiz.options.companies, MicroBiz.WorkTasksApp.filters_state);	
	Filters.JoblistFilterCollection = buildFilters('joblists', MicroBiz.options.companies, MicroBiz.WorkTasksApp.filters_state);
	// Filters.UserFilterCollection = buildFilters('users', MicroBiz.options.companies);	
	// Filters.AssetFilterCollection = buildFilters('assets', MicroBiz.options.companies);
	// Filters.TimeFilterCollection = buildFilters('time', MicroBiz.options.companies);
	
	MicroBiz.WorkTasksApp.Filters.showFilterList();
	//$('#navigation').empty();
	
  });

  // Worktasks Filters Initializer
  // ---------------------------

  // Get the list of categories on startup and hold
  // them in memory, so we can render them onto the
  // screen when we need to.
  MicroBiz.addInitializer(function(options){
	Filters.LocationFilterCollection = buildFilters('locations', MicroBiz.options.companies, MicroBiz.WorkTasksApp.filters_state);	
	Filters.JoblistFilterCollection = buildFilters('joblists', MicroBiz.options.companies, MicroBiz.WorkTasksApp.filters_state);
	Filters.UserFilterCollection = buildFilters('users', MicroBiz.options.companies, MicroBiz.WorkTasksApp.filters_state);	
	Filters.AssetFilterCollection = buildFilters('assets', MicroBiz.options.companies, MicroBiz.WorkTasksApp.filters_state);
	Filters.TimeFilterCollection = buildFilters('time', MicroBiz.options.companies, MicroBiz.WorkTasksApp.filters_state);
  });

  return Filters;
})(MicroBiz, Backbone, jQuery);
