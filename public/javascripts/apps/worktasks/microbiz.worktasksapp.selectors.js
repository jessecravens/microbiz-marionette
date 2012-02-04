// MicroBiz

// Worktasks.selectors
// ------------------

// The list of selectors

MicroBiz.WorkTasksApp.Selectors = (function(MicroBiz, Backbone, $){
  var Selectors = {};

  // The filter model and collection
  var Selector = Backbone.Model.extend({});

  var CompanySelectorCollection = Backbone.Collection.extend({
    model: Selector
  });

  // Worktask Selector Views
  // -------------------
  Selectors.CompanySelectorView = MicroBiz.ItemView.extend({
    template: "#worktasks-company-selectors-view-template",

    events: {
      "change": "selectorChanged"
    },

    // Raise an event aggregator event, to say that a
    // particular filter was clicked, and let the other
    // parts of the system figure out how to respond.
    selectorChanged: function(e){
	  console.log('COMPANY SELECTOR' + e)
      // e.preventDefault();
      // var filter = $(e.currentTarget).data("filter");
      // if (filter){	
      //   // MicroBiz.vent.trigger("behaviorlogs:filter:show", filter);
      // } else {
      //   // MicroBiz.vent.trigger("behaviorlogs:show");
      // }
    }
  });

  // Selectors Helper Methods
  // ----------------------------
  // If necesary, Do some processing on your onbjects before sending to view. 
  // Transform initial JSON to collections of filter models

  // obj - bootstrap data 
  // state - current state

  var buildSelectors = function(selectorType, obj, state){	
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! buildSelectors');

	switch (selectorType){
	case 'companies':
	
		console.log('filterType:' + selectorType);
		console.log('STATE - companies');
		console.log(state)
		var selector;
		var selectorCollection = new CompanySelectorCollection();
		_.each(obj, function(companies){
		  // console.log('within filterCollection parse');
		  // console.log(companies.name)
		  // console.log(obj.name)
		  filter = new Selector({name: companies.name, mid: companies.mid});
		  // console.log(filter)	
		  selectorCollection.add(selector);
		  // console.log(filterCollection);
		});
		return selectorCollection;
	  break;
	default:
	};
  };

  // Filters Public API
  // --------------------------
  
  // Show the selectors list - called from 
  Selectors.showSelectorsList = function(){
    console.log('Is CompanySelectorCollection built?'); 
 	console.log(Selectors.CompanySelectorCollection);

    var companySelectorView = new Selectors.CompanySelectorsView({
      collection: Filters.CompanyFilterCollection
    });

	MicroBiz.CompanySelectorRegion.show(companySelectorView);
  };

  // Worktasks Filters Event Handlers
  // -----------------------

  MicroBiz.vent.bind("state:worktasks:selectors:changed", function(){
    console.log('state:worktasks:selectors:changed');
	selectors.CompanySelectorCollection = buildSelectors('companies', MicroBiz.options.companies, MicroBiz.WorkTasksApp.state);
	
	MicroBiz.WorkTasksApp.Selectors.showSelectorsList();
	// $('#navigation').empty();
  });

  // Worktasks Selectors Initializer
  // ---------------------------

  // Get the list of categories on startup and hold
  // them in memory, so we can render them onto the
  // screen when we need to.
  MicroBiz.addInitializer(function(options){
	Selectors.CompanySelectorCollection = buildSelectors('companies', MicroBiz.options.companies, MicroBiz.WorkTasksApp.filters_state);
  });

  return Selectors;
})(MicroBiz, Backbone, jQuery);
