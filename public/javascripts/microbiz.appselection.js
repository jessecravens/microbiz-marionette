// MicroBiz

// App Selector
// ------------

// The app selector is the drop list on the top left of the
// application that lets you choose between "Mail" and "Contacts".
// Changing the selected app will cause the application to switch to
// that sub-app's contents and functionality.
MicroBiz.AppSelection = (function(MicroBiz, Backbone){
  var AppSelection = {};

  // The app selection view handles the changing of the app
  // selector drop list.
  AppSelection.AppSelectionView = MicroBiz.ItemView.extend({
    events: {
      "change select": "appChanged"
    },

    initialize: function(){
      // Make sure the `setSelection` method is always running in
      // the context of this view.
      _.bindAll(this, "setSelection");

      // Bind the events to show the correct app selection.
      this.setupAppSelectionEvents();
    },

    // Figure out which app is being selected and call the
    // correct object's `show` method.
    appChanged: function(e){
      e.preventDefault();
      var appName = $(e.currentTarget).val();

		switch (appName){
		case 'mail':
		  console.log('loading app - appName: ' + appName);
		  MicroBiz.MailApp.showInbox();
		  break;
		case 'worktasks':
		  console.log('loading app - appName: ' + appName);
		  // MicroBiz.WorkTasksApp.showWorktaskList();
		  MicroBiz.WorkTasksApp.showBehaviorLogList();
		  break;
		case 'contacts':
		  console.log('loading app - appName: ' + appName);
		  MicroBiz.ContactsApp.showContactList();
		  break;
		default:
		  console.log('unknown app selected')
		};	
    },

    // Show the correct app in the select box.
    setSelection: function(app){
      this.$("select").val(app);
    },

    setupAppSelectionEvents: function(){
      var self = this;

      // When the mail app is shown, be sure we are displaying "Mail"
      // in the app selector.
      MicroBiz.vent.bind("mail:show", function(){
        self.setSelection("mail");
      });

      // When the contacts app is shown, be sure we are displaying 
      // "Contacts" in the app selector.
      MicroBiz.vent.bind("contacts:show", function(){
        self.setSelection("contacts");
      });

      // When the worktasks app is shown, be sure we are displaying 
      // "Worktasks" in the app selector.
      MicroBiz.vent.bind("behaviorlogs:show", function(){
        self.setSelection("worktasks");
      });
    }
  });

  // Initialize the App Selector functionality when the
  // application starts.
  MicroBiz.addInitializer(function(){
    AppSelection.view = new AppSelection.AppSelectionView({
      el: $("#app-selector")
    });
  });

  return AppSelection;
})(MicroBiz, Backbone);
