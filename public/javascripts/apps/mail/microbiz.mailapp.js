// MicroBiz

// MailApp
// -------

// This is the app controller or sub-application
// for email. It contains all of the 
// high level knowledge of how to run the app
// when it's in mail mode.
MicroBiz.MailApp = (function(MicroBiz, Backbone){
  var MailApp = {};

  // Email Model And Collection
  // --------------------------

  MailApp.Email = Backbone.Model.extend({});

  MailApp.EmailCollection = Backbone.Collection.extend({
    model: MailApp.Email,

    // Get email for the specified category. Returns a
    // new `EmailCollection` with the filtered contents.
    // If no category is specified, returns `this`.
    forCategory: function(category){
      if (!category){ return this; }

      var filteredMailItems = this.filter(function(email){
        var categories = email.get("categories");
        var found = categories.indexOf(category) >= 0;
        return found;
      });

      return new MailApp.EmailCollection(filteredMailItems);
    }
  });

  // Mail App Helper Methods
  // -----------------------

  // Filter the mail by the category, if one was specified
  var showFilteredEmailList = function(category){
    var filteredMail = MailApp.emailList.forCategory(category);
    MailApp.MailBox.showMail(filteredMail);
  }

  // Mail App Public API
  // -------------------

  // Show the inbox with all email.
  MailApp.showInbox = function(){
	// console.log('showInbox');
    MailApp.showCategory();
    MicroBiz.vent.trigger("mail:show");
  };

  // Show a list of email for the given category.
  MailApp.showCategory = function(category){
    showFilteredEmailList(category);
    MailApp.Categories.showCategoryList();
  };

  // Show an individual email message, by Id
  MailApp.showMessage = function(messageId){
    var email = MailApp.emailList.get(messageId);
    MailApp.MailBox.showMessage(email);
    MailApp.Categories.showCategoryList();
  };

  // Mail App Event Handlers
  // -----------------------

  // When a category is selected, filter the mail list
  // based on it.
  MicroBiz.vent.bind("mail:category:show", function(category){
    showFilteredEmailList(category);
  });

  // When the mail app is shown or `inbox` is clicked,
  // show all the mail.
  MicroBiz.vent.bind("mail:show", function(){
    showFilteredEmailList();
  });

  // Mail App Initializer
  // --------------------

  // Initializes the email collection object with the list
  // of emails that are passed in from the call to 
  // `MicroBiz.start`.
  MicroBiz.addInitializer(function(options){
	console.log('MailApp initializer options:')
	console.log(options.email);
    MailApp.emailList = new MailApp.EmailCollection(options.email);
  });
  
  return MailApp;
})(MicroBiz, Backbone);
