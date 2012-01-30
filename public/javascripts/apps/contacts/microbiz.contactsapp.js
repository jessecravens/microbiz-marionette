// MicroBiz

// Contacts
// --------

// Manage the list of contacts and the categories for
// the contacts. Limited functionality at this point,
// but slowly adding more.
MicroBiz.ContactsApp = (function(MicroBiz, Backbone){
  var Contacts = {};

  // Contact Model And Collection
  // -----------------------------

  Contacts.Contact = Backbone.Model.extend({});

  Contacts.ContactCollection = Backbone.Collection.extend({
    model: Contacts.Contact
  });

  // Public API
  // ----------
  
  // Show the contact list and the categories.
  Contacts.showContactList = function(){
	console.log('showContactList');
    MicroBiz.ContactsApp.ContactList.show(Contacts.contacts);
    MicroBiz.ContactsApp.Categories.show();
    $('#company-filters').empty();
    $('#location-filters').empty();
    $('#company-filters').empty();
    $('#joblist-filters').empty();
    $('#user-filters').empty();
    $('#asset-filters').empty();
    $('#time-filters').empty();
    MicroBiz.vent.trigger("contacts:show");
  };

  // Initializer
  // -----------
  
  MicroBiz.addInitializer(function(options){
	console.log('Contacts App initializer options:')
	console.log(options.contacts)
    Contacts.contacts = new Contacts.ContactCollection(options.contacts);
  });
  
  return Contacts;
})(MicroBiz, Backbone);

