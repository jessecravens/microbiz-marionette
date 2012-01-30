// MicroBiz

// BehaviorLog List
// -------------

// Manage the display of, and interaction with, the list of behaviorLogs.
MicroBiz.WorkTasksApp.BehaviorLogList = (function(MicroBiz, Backbone){
  var BehaviorLogList = {};

  // BehaviorLogList Views
  // ------------------

  // Display an individual behaviorlog in the list.
  var BehaviorLogItemView = MicroBiz.ItemView.extend({
    tagName: "li",
    template: "#behaviorlog-item-template"
  });

  // Display the list of behaviorlogs.
  var BehaviorLogListView = MicroBiz.CollectionView.extend({
    tagName: "ul",
    className: "behaviorlog-list",
    itemView: BehaviorLogItemView
  });

  // Public API
  // ----------

  // Show the list of behaviorlogs.
  BehaviorLogList.show = function(behaviorlogs){
	// console.log('BehaviorLogList.show');
    var behaviorlogsView = new BehaviorLogListView({
      collection: behaviorlogs
    });
    MicroBiz.mainRegion.show(behaviorlogsView);
  };

  // Show the list of behaviorlogs.
  BehaviorLogList.showFiltered = function(behaviorlogs){
	// console.log('BehaviorLogList.show');
    var behaviorlogsView = new BehaviorLogListView({
      collection: behaviorlogs
    });
    MicroBiz.mainRegion.show(behaviorlogsView);
  };


  return BehaviorLogList;
})(MicroBiz, Backbone);