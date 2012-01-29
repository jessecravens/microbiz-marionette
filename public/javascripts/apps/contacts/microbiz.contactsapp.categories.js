// MicroBiz

// Contact Categories
// --------

// Manage the list of categories, and the interactions with them,
// for the contacts app.
MicroBiz.ContactsApp.Categories = (function(MicroBiz, Backbone){
  var Categories = {};

  // Categories Views
  // ----------------

  // Displays the hard coded list of contact categories, from
  // the view template.
  Categories.ContactCategoriesView = MicroBiz.ItemView.extend({
    template: "#contact-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    categoryClicked: function(e){
      e.preventDefault();
    }
  });

  // Public API
  // ----------
  
  // Show the list of contact categories in the 
  // left hand navigation.
  Categories.show = function(){
    MicroBiz.navigationRegion.show(new Categories.ContactCategoriesView());
  }

  return Categories;
})(MicroBiz, Backbone);
