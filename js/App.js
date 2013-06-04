window.App = Ember.Application.create({
rootElement: '#ember-app'
});

App.Store = DS.Store.extend({
  revision: 12
});

App.Log = DS.Model.extend({
	host : DS.attr('string'),
	date : DS.attr('string'),
	request : DS.attr('string'),
	useragent : DS.attr('string'),
	status : DS.attr('string'),
	size : DS.attr('number'),
	path : function() {
				var chemin = this.get('request');
				
				if (chemin != null ) {
					var start = chemin.indexOf(' ');
					var end = chemin.indexOf(' ', start + 1);
					chemin = chemin.substring(start + 1, end);
				}
				
				return chemin;
			}.property('request'),
	method : function() {
				var methode = this.get('request');
				
				if (methode != null ) {
					methode = methode.substring(0, methode.indexOf(' '));
				}
				
				return methode;
			}.property('request')
	
})

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return App.Log.find();
	}
});

App.IndexController = Ember.ArrayController.extend({
	searchTerm :'',
	// the initial value of the `search` property
	filteredLogs : function() {
		
	}.property('searchTerm', 'content.@each')
});

App.Router.map(function() {
  this.route("detail", { path: "/log/:log_id" });
});


Ember.Handlebars.registerBoundHelper('size', function(value, options) {
	var formattedSize = value;
  
	if (value == undefined) {
		return "";
	}
	
	if (value < 1024) {
		formattedSize += " B";
	} else {
		formattedSize = Math.round(value / 1024* 100) / 100 + " kB";
	}
	
	
	return formattedSize;
});