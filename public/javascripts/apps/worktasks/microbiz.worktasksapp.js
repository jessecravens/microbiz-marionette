// MicroBiz

// Wortask App Worktasks
// --------

// Manage the list of worktasks

MicroBiz.WorkTasksApp = (function(MicroBiz, Backbone){
  var Worktasks = {};

  // Worktask Model And Collection
  // -----------------------------

  Worktasks.BehaviorLog = Backbone.Model.extend({});

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
    MicroBiz.WorkTasksApp.Filters.showFilterList(Worktasks.filters);
	$('#navigation').empty();
    MicroBiz.vent.trigger("behaviorlogs:show");
  };

  // Show filtered behavior log list.
  Worktasks.showFilteredBehaviorLogList = function(filters){
    MicroBiz.WorkTasksApp.BehaviorLogList.show(Worktasks.behaviorlogs);
    MicroBiz.WorkTasksApp.Filters.showFilterList(Worktasks.selected_filters);
    MicroBiz.vent.trigger("behaviorlogs:show");
  };

  // Show the filters .
  // Worktasks.showFilters = function(){
  // 	
  //   MicroBiz.WorkTasksApp.Filters.show(Worktasks.filters);
  //   MicroBiz.vent.trigger("filters:show");
  // };


  // Initializer
  // -----------
  
  MicroBiz.addInitializer(function(options){
	console.log('Worktasks App initializer options:')
	console.log(options.worktasks);
	console.log(options.behaviorlogs);
	
    // Worktasks.worktasks = new Worktasks.WorktaskCollection(options.worktasks);
    Worktasks.behaviorlogs = new Worktasks.BehaviorLogCollection(options.behaviorlogs);

	// filter first and then show ?????
    // Worktasks.behaviorlogs = new Worktasks.BehaviorLogCollection(options.behaviorlogs);

  });
  
  return Worktasks;
})(MicroBiz, Backbone);