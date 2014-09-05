define([
	'text!templates/footer/footerTemplate.html'
], function (
	footerView
) {

	var FooterView = Backbone.View.extend({

		el: '#footer',

		render: function () {

			this.$el.html(footerView);

		}

	});

	return FooterView;

});