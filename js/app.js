//app.js

//app namespace exposing api
var app = (function() {
	//api definition
	var api = {
			views: {},
			models: {},
			collections: {}
		};

	//router
	var Router = Backbone.Router.extend({
		//define routes and actions
			routes: {
				'feed': 'loadInstaFeed',
				'*path': 'indexPage'
			},
			indexPage: function() {
				app.$main.empty();
				ViewsFactory.indexPage();
			},
			loadInstaFeed: function() {
				ViewsFactory.instaFeed();
			}
		});

	//views factory
	var ViewsFactory = {
			//mainNav
			mainNav: function() {
				//create and cache view
				if(!app.mainNavView) {
					app.mainNavView = new app.views.MainNav({
						el: $('#main-nav')
					});
				}
				return app.mainNavView;
			},
			indexPage: function() {
				//create and cache view
				if(!app.indexPageView) {
					app.indexPageView = new app.views.IndexPage({
						el: app.$main
					});
				}
				else {
					app.indexPageView.render();
				}
				return app.indexPageView;
			},
			//instaFeed
			instaFeed: function() {
				if(!app.instaFeedView) {
					//create and cache collection
					app.instagramItems = new app.collections.InstagramItems();
					//create and cache view
					app.instaFeedView = new app.views.InstaFeed({
						el: app.$main
					});
				}
				else {
					//else, call refresh method
					app.instaFeedView.refresh();
				}
				return app.instaFeedView;
			}
		};

	//init function
	api.init = function() {
		console.log('[app.js / init() :: this]\n', this);
		//cache main content
		this.$main = $('#main-content');
		//render main nav
		ViewsFactory.mainNav();
		//init router
		this.router = new Router();
		Backbone.history.start();
		//return object
		return this;
	};

	//expose api
	return api;
})();