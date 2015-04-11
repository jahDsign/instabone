//collections/instabone.js

//InstagramItems collection
// app.collections.InstagramItems = Backbone.Collection.extend({
// 	initialize: function() {
// 		this.add({title:'instagram item test 1'});
// 		this.add({title:'instagram item test 2'});
// 		this.add({title:'instagram item test 3'});
// 	},
// 	model: app.models.InstagramItem
// });
app.collections.InstagramItems = Backbone.Collection.extend({
	//set instagram URL
	url: 'https://api.instagram.com/v1/users/1099210960/media/recent/?client_id=bbc139b43a9c4a47bc5abee948d60bc4&callback=?',
	initialize: function() {
		var self = this;
		//fetch data
		self.fetch({
			error: this.fetchError
		});
	},
	parse: function(response) {
		//process result
		var entries = response.data,
			entriesLength = entries.length;		
		for (var i = 0; i < entriesLength; i++) {
			var entry = entries[i];
			this.add({imgUrl: entry.images.low_resolution.url});
		}
		console.log('parse ', this, response);
		this.trigger('fetchSuccess');
	},
	fetchError: function() {
		console.log('[collections/instabone.js / fetchError()]');
	},
	model: app.models.InstagramItem
});