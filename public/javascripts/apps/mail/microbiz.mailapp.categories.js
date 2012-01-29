// MicroBiz

// MailApp.Categories
// ------------------

// The list of categories for email. Right now this 
// displayed a hard coded list, stuffed directly in
// the HTML template. 
MicroBiz.MailApp.Categories = (function(MicroBiz, Backbone, $){
  var Categories = {};

  // The category model and collection
  var Category = Backbone.Model.extend({});
  var CategoryCollection = Backbone.Collection.extend({
    model: Category
  });

  // Mail Category Views
  // -------------------

  // The view to show the list of categories. The view
  // template includes the standard categories hard coded
  // and then it renders the individual categories, too.
  Categories.CategoriesView = MicroBiz.ItemView.extend({
    template: "#mail-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    // Raise an event aggregator event, to say that a
    // particular category was clicked, and let the other
    // parts of the system figure out how to respond.
    categoryClicked: function(e){
      e.preventDefault();
      var category = $(e.currentTarget).data("category");
      if (category){
        MicroBiz.vent.trigger("mail:category:show", category);
      } else {
        MicroBiz.vent.trigger("mail:show");
      }
    }
  });

  // Mail Categories Helper Methods
  // ----------------------------

  // Build a proper collection of category models
  var buildCategories = function(categoryNames){
    var category;
    var categoryCollection = new CategoryCollection();
    _.each(categoryNames, function(categoryName){
      category = new Category({name: categoryName});
      categoryCollection.add(category);
    });
    return categoryCollection;
  };

  // Mail Categories Public API
  // --------------------------
  
  // Show the mail categories list
  Categories.showCategoryList = function(){
    var categoryView = new Categories.CategoriesView({
      collection: Categories.categoryCollection
    })
    MicroBiz.navigationRegion.show(categoryView);
  }

  // Mail Categories Initializer
  // ---------------------------

  // Get the list of categories on startup and hold
  // then in memory, so we can render them on to the
  // screen when we need to.
  MicroBiz.addInitializer(function(options){
    Categories.categoryCollection = buildCategories(options.categories);
  });

  return Categories;
})(MicroBiz, Backbone, jQuery);
