'use strict';

const mongoose = require('mongoose')

const idsSchema = new mongoose.Schema({
	 short_urls_id: Number,
});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			short_urls_id: 0,
		});
		newIds.save();
	}
})

module.exports = Ids; 