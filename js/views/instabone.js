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

//IndexPage
app.views.IndexPage = Backbone.View.extend({
	template: _.template($('#template-index-page').html()),
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
		this.instaFeedListView = new app.views.InstaFeedList({
			model: app.instagramItems
		});
		//render view
		this.render();
		//add event listeners
		//fetchSuccess
		this.listenTo(app.instagramItems, 'instagramItems.fetchSuccess', function() {
			//render instaFeedList
			this.renderInstaFeedList();
		});
		//endOfFeed
		this.listenTo(app.instagramItems, 'instagramItems.endOfFeed', function() {
			//remove load more
			this.removeLoadMore();
		});
	},
	render: function() {
		//render element html
		this.$el.html(this.template({}));
		//cache instaFeeedList container
		this.$instaFeedList = $('#insta-feed-list');
	},
	refresh: function() {
		//render element html
		this.render();
		//refresh instaFeedListView
		this.instaFeedListView.setElement(this.$instaFeedList).refresh();
		//check endOfFeed
		if(this.endOfFeed) {
			this.removeLoadMore();
		}
	},
	renderInstaFeedList: function() {
		//render instaFeedListView
		this.instaFeedListView.setElement(this.$instaFeedList).render();
	},
	loadMore: function() {
		//get next set of data
		app.instagramItems.getData();
	},
	removeLoadMore: function() {
		$('#insta-feed-load-more').remove();
		this.endOfFeed = true;
	}
});

//InstaFeedList view
app.views.InstaFeedList = Backbone.View.extend({
	$cachedItemsList: $('<ul />'),
	render: function() {
		var template = _.template($('#template-insta-feed-item').html()),
			//get items list
			$ul = this.getItemsList();
		//loop through model and add items
		this.model.each(function(instagramItem) {
			$ul.append(
				template({
					link: instagramItem.get('link'),
					imgUrl: instagramItem.get('imgUrl'),
					text: instagramItem.get('text'),
					from: instagramItem.get('from')
				})
			);
		});
		//cache items
		this.setItemsList($ul);
		//refresh view
		this.refresh();
	},
	refresh: function() {
		//render element html
		this.$el.html(this.getItemsList().html());
	},
	setItemsList: function($ul) {
		//keep items in cache
		$cachedItemsList = $ul;
	},
	getItemsList: function() {
		//return cached items
		return this.$cachedItemsList;
	}
});