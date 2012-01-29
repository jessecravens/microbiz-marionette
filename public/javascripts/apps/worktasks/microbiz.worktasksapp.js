// MicroBiz

// Wortask App Worktasks
// --------

// Manage the list of worktasks

MicroBiz.WorkTasksApp = (function(MicroBiz, Backbone){
  var Worktasks = {};

  // Worktask Model And Collection
  // -----------------------------

  Worktasks.Worktask = Backbone.Model.extend({});

  Worktasks.WorktaskCollection = Backbone.Collection.extend({
    model: Worktasks.Worktask
  });

  Worktasks.BehaviorLog = Backbone.Model.extend({});

  Worktasks.BehaviorLogCollection = Backbone.Collection.extend({
    model: Worktasks.BehaviorLog
  });

  Worktasks.Filter = Backbone.Model.extend({});

  Worktasks.FilterCollection = Backbone.Collection.extend({
    model: Worktasks.Filter
  });

  // Public API
  // ----------
  
  // Show the worktask list.
  Worktasks.showWorktaskList = function(){
	
    MicroBiz.WorkTasksApp.WorktaskList.show(Worktasks.worktasks);
    MicroBiz.vent.trigger("worktasks:show");
  };

  // Show the behavior log list.
  Worktasks.showBehaviorLogList = function(){
	
    MicroBiz.WorkTasksApp.BehaviorLogList.show(Worktasks.behaviorlogs);
    MicroBiz.vent.trigger("behaviorlogs:show");
  };

  // Show the filters .
  Worktasks.showFilters = function(){
	
    MicroBiz.WorkTasksApp.Filters.show(Worktasks.filters);
    MicroBiz.vent.trigger("filters:show");
  };


  // Initializer
  // -----------
  
  MicroBiz.addInitializer(function(options){
	console.log('Worktasks App initializer options:')
	console.log(options.worktasks);
	console.log(options.behaviorlogs);
	
    Worktasks.worktasks = new Worktasks.WorktaskCollection(options.worktasks);
    Worktasks.behaviorlogs = new Worktasks.BehaviorLogCollection(options.behaviorlogs);
  });
  
  return Worktasks;
})(MicroBiz, Backbone);