const Joi = require('joi');
const mongoose = require('mongoose');

// Schema to Validate incomming Complaint Object from user.
const schema = {
    title: Joi.string().min(10).max(255).required(),
    body: Joi.string().min(3).max(255).required(),
}

// This is the actual Schema that how the complaint object will be saved in MongoDB.
const complaintSchema = new mongoose.Schema({
    complaint_title: String,
    complaint_body: {
        type: String,
        minlength: 10,
        maxlength: 500
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Creating instance of Model Complaint to store,reteive,uodate and delete records from complaints Collection.
const Complaint = mongoose.model('Complaint', complaintSchema);

// function to validate incomming object with the schema and return the result.
function validateComplaint(complaint) {
    return Joi.validate(complaint, schema);
}


exports.Complaint = Complaint;
exports.Validate = validateComplaint;
