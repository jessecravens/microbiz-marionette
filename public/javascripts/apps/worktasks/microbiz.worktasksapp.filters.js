// MicroBiz

// Worktasks.Filters
// ------------------

// The list of filters for behaviorlogs. 

MicroBiz.WorkTasksApp.Filters = (function(MicroBiz, Backbone, $){
  var Filters = {};

  // The filter model and collection
  var Filter = Backbone.Model.extend({});
  // var FilterCollection = Backbone.Collection.extend({
  //   model: Filter
  // });
  var CompanyFilterCollection = Backbone.Collection.extend({
    model: Filter
  });
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

  Filters.CompanyFiltersView = MicroBiz.ItemView.extend({
    template: "#worktasks-company-filters-view-template",

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

  Filters.LocationFiltersView = MicroBiz.ItemView.extend({
    template: "#worktasks-location-filters-view-template",

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
  var buildFilters = function(filterType, obj){	
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! buildFilters');

	switch (filterType){
	case 'companies':
		console.log('filterType:' + filterType);
		var filter;
		var filterCollection = new CompanyFilterCollection();
		_.each(obj, function(companies){
		  // console.log('within filterCollection parse');
		  // console.log(companies.name)
		  // console.log(obj.name)
		  filter = new Filter({name: companies.name});
		  // console.log(filter)	
		  filterCollection.add(filter);
		  // console.log(filterCollection);
		});
		return filterCollection;
	  break;
	case 'locations':
		console.log('filterType:' + filterType);
		var filter;
		var filterCollection = new LocationFilterCollection();
		_.each(obj, function(companies){
		  // console.log('within LocationFilterCollection parse');
		  // console.log(companies.name)
		
				_.each(companies.locations, function(locations){
					// console.log(companies)
					// console.log(locations.name)
		  			filter = new Filter({name: locations.name, company_name: companies.name});
		  			// console.log(filter)	
		  			filterCollection.add(filter);
				});
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
					// console.log(companies)
					console.log(joblists.name)
		  			filter = new Filter({name: joblists.name, company_name: companies.name});
		  			console.log(filter)	
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

  // Filters Public API
  // --------------------------
  
  // Show the filters list
  Filters.showFilterList = function(){

    console.log('Is CompanyFilterCollection built?'); 
 	console.log(Filters.CompanyFilterCollection);

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

    var companyFilterView = new Filters.CompanyFiltersView({
      collection: Filters.CompanyFilterCollection
    });
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

	MicroBiz.CompanyFilterRegion.show(companyFilterView);
    MicroBiz.LocationFilterRegion.show(locationFilterView);
    MicroBiz.JoblistFilterRegion.show(joblistFilterView);
    MicroBiz.UserFilterRegion.show(userFilterView);
    MicroBiz.AssetFilterRegion.show(assetFilterView);
    MicroBiz.TimeFilterRegion.show(timeFilterView);
  };

  // Mail Categories Initializer
  // ---------------------------

  // Get the list of categories on startup and hold
  // them in memory, so we can render them onto the
  // screen when we need to.
  MicroBiz.addInitializer(function(options){
    // Filters.filterCollection = buildFilters(options.filters);
	Filters.CompanyFilterCollection = buildFilters('companies', options.companies);
	Filters.LocationFilterCollection = buildFilters('locations', options.companies);	
	Filters.JoblistFilterCollection = buildFilters('joblists', options.companies);
	Filters.UserFilterCollection = buildFilters('users', options.companies);	
	Filters.AssetFilterCollection = buildFilters('assets', options.companies);
	Filters.TimeFilterCollection = buildFilters('time', options.companies);
  });

  return Filters;
})(MicroBiz, Backbone, jQuery);
