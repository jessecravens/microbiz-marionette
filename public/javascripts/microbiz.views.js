// MicroBiz

// Backbone View Rendering
// -----------------------

// Replace the default underscore.js templating with
// jQuery templates.
Backbone.Marionette.ItemView.prototype.renderTemplate = function(template, data){
  var html = template.tmpl(data);
  return html;
};

// Alias the views so they are easier to get to.
MicroBiz.ItemView = Backbone.Marionette.ItemView;
MicroBiz.CollectionView = Backbone.Marionette.CollectionView;
