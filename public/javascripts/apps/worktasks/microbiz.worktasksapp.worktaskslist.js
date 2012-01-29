// MicroBiz

// Worktask List
// -------------

// Manage the display of, and interaction with, the list of worktasks.
MicroBiz.WorkTasksApp.WorktaskList = (function(MicroBiz, Backbone){
  var WorktaskList = {};

  // WorktaskList Views
  // ------------------

  // Display an individual location in the list.
  var WorktaskItemView = MicroBiz.ItemView.extend({
    tagName: "li",
    template: "#worktask-item-template"
  });

  // Display the list of locations.
  var WorktaskListView = MicroBiz.CollectionView.extend({
    tagName: "ul",
    className: "worktask-list",
    itemView: WorktaskItemView
  });

  // Public API
  // ----------

  // Show the list of locations.
  WorktaskList.show = function(worktasks){
	console.log('WorktaskList.show');
    var worktasksView = new WorktaskListView({
      collection: worktasks
    });
    MicroBiz.mainRegion.show(worktasksView);
  }

  return WorktaskList;
})(MicroBiz, Backbone);