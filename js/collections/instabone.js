//collections/instabone.js

//InstagramItems collection
app.collections.InstagramItems = Backbone.Collection.extend({
	//set instagram URL
	url: 'https://api.instagram.com/v1/users/1889387/media/recent/?client_id=bbc139b43a9c4a47bc5abee948d60bc4&callback=?',
	initialize: function() {
		this.getData();
	},
	getData: function() {
		this.fetch({
			error: this.fetchError
		});
	},
	parse: function(response) {
		//process result
		var entries = response.data,
			entriesLength = entries.length,
			nextUrl = response.pagination.next_url;
		for (var i = 0; i < entriesLength; i++) {
			var entry = entries[i];
			this.add({
				link: entry.link,
				imgUrl: entry.images.low_resolution.url,
				text: entry.caption.text,
				from: 'From: '+entry.caption.from.full_name
			});
		}
		//modify url to next or notify of end of feed
		if(nextUrl) {
			this.url = response.pagination.next_url+'&callback=?';
		} else {
			this.trigger('instagramItems.endOfFeed');
		}
		//trigger success
		this.trigger('instagramItems.fetchSuccess');
	},
	fetchError: function() {
		console.log('[collections/instabone.js / fetchError()]');
	},
	model: app.models.InstagramItem
});