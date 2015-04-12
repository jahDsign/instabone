//models/instabone.js

//Instabone model
app.models.InstagramItem = Backbone.Model.extend({
	default: {
		link: '',
		imgUrl: '',
		text: '',
		from: ''
	}
});