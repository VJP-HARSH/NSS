const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    photo: { type: String, default: 'default.png' },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    adminType: {
        type: String,
        enum: ['Super Admin', 'Administrator', 'Technical Admin', 'Customer Service Admin'],
        required: true
    },
    isApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Admin', adminSchema);
