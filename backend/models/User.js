const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Supplier', 'Customer','Employee'],
        default: 'Employee',
        // required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isAuthenticated : {
        type:Boolean,
        default:false,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;


