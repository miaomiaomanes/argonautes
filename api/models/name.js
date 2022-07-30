const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NameSchema = new Schema({
	name: {
		type: String,
		trim: true,
		maxlength: 50,
		required: true,
		
	},

});

const Name = mongoose.model("Name", NameSchema);



module.exports = Name;