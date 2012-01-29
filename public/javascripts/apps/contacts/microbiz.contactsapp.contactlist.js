// MicroBiz

// Contacts List
// -------------

// Manage the display of, and interaction with, the list of contacts.
MicroBiz.ContactsApp.ContactList = (function(MicroBiz, Backbone){
  var ContactList = {};

  // Contact List Views
  // ------------------

  // Display an individual contact in the list.
  var ContactItemView = MicroBiz.ItemView.extend({
    tagName: "li",
    template: "#contact-item-template"
  });

  // Display the list of contacts.
  var ContactListView = MicroBiz.CollectionView.extend({
    tagName: "ul",
    className: "contact-list",
    itemView: ContactItemView
  });

  // Public API
  // ----------

  // Show the list of contacts.
  ContactList.show = function(contacts){
	console.log('ContactList.show')
    var contactsView = new ContactListView({
      collection: contacts
    });
    MicroBiz.mainRegion.show(contactsView);
  }

  return ContactList;
})(MicroBiz, Backbone);
