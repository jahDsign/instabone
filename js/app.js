//app.js

//app namespace exposing api
var app = (function() {
	//api definition
	var api = {
			views: {},
			models: {},
			collections: {}
		};

	//views factory
	var ViewsFactory = {
			//mainNav
			mainNav: function() {
				//create mainNav view once
				if(!this.mainNavView) {
					this.mainNavView = new api.views.MainNav({
						el: $('#main-nav')
					});
				}
				return this.mainNavView;
			},
			//instaFeed
			instaFeed: function() {
				if(!this.instaFeedView) {
					this.instaFeedView = new api.views.InstaFeed({
						el: $('#main-content')
					});
				}
				return this.instaFeedView;
			}
		};

	//router
	var Router = Backbone.Router.extend({
		//define routes and actions
			routes: {
				'': 'index',
				'item-2': 'action2',
				'item-3/:param': 'action3'
			},
			index: function() {
				ViewsFactory.instaFeed();
			},
			action2: function() {
				$('#main-content').empty();
			}
		});

	//init function
	api.init = function() {
console.log('[app.js / init() :: this]\n', this);
		//reference instagramItems collection
		this.instagramItems = new api.collections.InstagramItems();
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