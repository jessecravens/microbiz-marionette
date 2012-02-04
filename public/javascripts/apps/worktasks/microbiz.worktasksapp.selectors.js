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
	  console.log('COMPANY SELECTOR' + e);
	  // console.log(e.currentTarget);
	
	  // grab the value from the slector
	  // change the state of the selectors 
	  // within the buildFilters() remove the filters associated with the hidden company
	  // trigger event to repaint the filters
	  
	    var selector = $(e.currentTarget).find(':selected').data('selector')
		var stateCompArr = getSelectersStateArray('company');
	
		// For now ONLY ONE COMPANY AT A TIME
		// if the selected selector is already there return
		if (_.indexOf(stateCompArr, selector) != -1){
			return;
		}
		// else pull the old off the array, and push the new on
		else {
			var index = stateCompArr.indexOf(selector);
			stateCompArr.splice(index, 1);
			stateCompArr.push(selector);
		}
	  // repaint the filters	
	  MicroBiz.vent.trigger("state:worktasks:filters:changed");
	  MicroBiz.vent.trigger("behaviorlogs:show");
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
	
	// using state here - 
	// used to store preference of company selecton on the server
	// on initial render it loads that option as selected: true

		var selector;
		var selectorCollection = new CompanySelectorCollection();
		_.each(obj, function(companies){
			
			var stateCompArr = getSelectersStateArray('company');
		
			if (_.indexOf(stateCompArr, companies.name) != -1){
			  selector = new Selector({name: companies.name, selected: true});
			}else{
			  selector = new Selector({name: companies.name, selected: false});
			};
			
		  selectorCollection.add(selector);
		});
		return selectorCollection;
	  break;
	default:
	};
  };

  var getSelectersStateArray = function(type){
	
		var selectors_state = MicroBiz.WorkTasksApp.selectors_state;
		var stateArr = _.toArray(selectors_state);

		// use _.find() to get the model with a 'name' attribute == to obj of type out of the state array
		var stateObj = _.find(stateArr,
			function(ob) {
		  		return ob.get('name') == type;
			});

		var stateItemsArr = stateObj.get('items');
		return stateItemsArr;
	};
	
  var getSelectersCurrentStateByName = function(type){
		
		var arr = getSelectersStateArray(type);
	    MicroBiz.WorkTasksApp.current_company = _.first(arr) 
		return MicroBiz.WorkTasksApp.current_company;
	};
	
	
  // Filters Public API
  // --------------------------
  
  // Show the selectors list - called from 
  Selectors.showSelectorsList = function(){
    console.log('Is CompanySelectorCollection built?'); 
 	console.log(Selectors.CompanySelectorCollection);

    var companySelectorView = new Selectors.CompanySelectorView({
      collection: Selectors.CompanySelectorCollection
    });

	MicroBiz.CompanySelectorRegion.show(companySelectorView);
  };

  Selectors.getSelectersCurrentStateByName = function(type){
    var arr = getSelectersStateArray(type);
	MicroBiz.WorkTasksApp.current_company = _.first(arr);
	return MicroBiz.WorkTasksApp.current_company;
  };
  

  // Worktasks Filters Event Handlers
  // -----------------------

  // will rebuild the selectors if a new Selector model is added to CompanySelectorCollection

  MicroBiz.vent.bind("state:worktasks:selectors:changed", function(){
    console.log('state:worktasks:selectors:changed');
	Selectors.CompanySelectorCollection = buildSelectors('companies', MicroBiz.options.companies, MicroBiz.WorkTasksApp.selectors_state);
	
	MicroBiz.WorkTasksApp.Selectors.showSelectorsList();
	// $('#navigation').empty();
  });

  // Worktasks Selectors Initializer
  // ---------------------------

  // Get the list of selectors on startup and hold
  // them in memory, so we can render them onto the
  // screen when we need to.
  MicroBiz.addInitializer(function(options){
	Selectors.CompanySelectorCollection = buildSelectors('companies', MicroBiz.options.companies, MicroBiz.WorkTasksApp.selectors_state);
    
  });

  return Selectors;
})(MicroBiz, Backbone, jQuery);
