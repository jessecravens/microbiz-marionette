// MicroBiz

// Wortask App Worktasks
// --------
// Manage the list of worktasks

MicroBiz.WorkTasksApp = (function(MicroBiz, Backbone){
  var Worktasks = {};

  // Worktask Model And Collection
  // -----------------------------

  Worktasks.State = Backbone.Model.extend({
	initialize: function() { 
		console.log('State Model');
		// Doesnt seem like I can bind events here
	}
  });

  Worktasks.StateCollection = Backbone.Collection.extend({
	model: Worktasks.State,
	initialize: function(o, type) { 

		console.log('State Collection initialized: ' + type);

	    this.bind("change", function() {
			// rebuild filters here - when state collection changes
	    	console.log(this + " state collection changed");
			MicroBiz.vent.trigger("state:worktasks:"+ type +":changed");
	    });
	}
  });

  Worktasks.BehaviorLog = Backbone.Model.extend({
	
  });
  Worktasks.BehaviorLogCollection = Backbone.Collection.extend({
    model: Worktasks.BehaviorLog
  });

  // Public API
  // ----------
  // Show the worktask list.
  // Worktasks.showWorktaskList = function(){
  // 	
  //   MicroBiz.WorkTasksApp.WorktaskList.show(Worktasks.worktasks);
  //   MicroBiz.vent.trigger("worktasks:show");
  // };

  // Show the behavior log list.
  Worktasks.showBehaviorLogList = function(){

    MicroBiz.WorkTasksApp.BehaviorLogList.show(Worktasks.behaviorlogs);

	// doesnt currently get passed any params
    MicroBiz.WorkTasksApp.Selectors.showSelectorsList();
    MicroBiz.WorkTasksApp.Filters.showFilterList();

	$('#navigation').empty();
	
	// sets the router to #worktasks
	MicroBiz.vent.trigger("behaviorlogs:show");
  
  };

  // Show filtered behavior log list.
  // Worktasks.showFilteredBehaviorLogList = function(filters){
  //   MicroBiz.WorkTasksApp.BehaviorLogList.show(Worktasks.behaviorlogs);
  //   MicroBiz.WorkTasksApp.Filters.showFilterList(Worktasks.selected_filters);
  //   MicroBiz.vent.trigger("behaviorlogs:show");
  // };

  // Show the filters .
  // Worktasks.showFilters = function(){
  // 	
  //   MicroBiz.WorkTasksApp.Filters.show(Worktasks.filters);
  //   MicroBiz.vent.trigger("filters:show");
  // };

  // Worktasks Application Level Event Handlers
  // -----------------------

  // MicroBiz.vent.bind("state:worktasks:filters:changed", function(){
  //   console.log('state:worktasks:filters:changed');
  // });

  // Initializers
  // -----------
  MicroBiz.addInitializer(function(options){
	console.log('Worktasks App initializer options:');
    Worktasks.selectors_state = new Worktasks.StateCollection(options.WorktasksStateSelectors, 'selectors');
	Worktasks.filters_state = new Worktasks.StateCollection(options.WorktasksStateFilters, 'filters');
    Worktasks.behaviorlogs = new Worktasks.BehaviorLogCollection(options.behaviorlogs);
  });
  
  return Worktasks;
})(MicroBiz, Backbone);