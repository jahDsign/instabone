//views/instabone.js

//MainNav view
app.views.MainNav = Backbone.View.extend({
	template: _.template($('#template-main-nav').html()),
	initialize: function() {
		//call render method
		this.render();
	},
	render: function() {
		//render element html
		this.$el.html(this.template({}));
	}
});

//InstaFeed view
app.views.InstaFeed = Backbone.View.extend({
	template: _.template($('#template-insta-feed').html()),
	events: {
		'click #insta-feed-load-more': 'loadMore'
	},
	initialize: function() {
		//define nested view
		this.nestedView = new app.views.InstaFeedList({
			model: app.instagramItems
		});
		this.render();
		//add event listener for AIP call success
		this.listenTo(app.instagramItems, 'fetchSuccess', function() {
			//call nested view
			this.renderNested(this.nestedView,$('#insta-feed-list'));
		});
	},
	render: function() {
		//render element html
		this.$el.html(this.template({}));
	},
	renderNested: function(view, selector) {
		var $element = (selector instanceof $) ? selector : this.$(selector);
		view.setElement($element).render();
	},
	loadMore: function() {
		console.log('load more');
	}
});

//InstaFeedList view
app.views.InstaFeedList = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		var template = _.template($('#template-insta-feed-item').html()),
			//create list element holder
			$instaFeedList = $('<ul />');
		//loop through models
		this.model.each(function(instagramItem) {
			$instaFeedList.append(
				template({
					imgUrl: instagramItem.get('imgUrl')
				})
			);
		});
		//render element html
		this.$el.html($instaFeedList.html());
	}
});