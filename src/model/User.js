const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    email:{
        type:String,
        unique:true,
        require:true
    },
    userName:{
        type:String,
        require:true,

    },
    roles: {
		type: [String],
		enum: ["user", "admin", "super_admin"],
		default: ["user"],
	},
})

module.exports = mongoose.model('User', userSchema);
