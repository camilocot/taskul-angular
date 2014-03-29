/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



/**
 * Task Schema
 */
var TaskSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.ObjectId,
        ref : 'Comment'
    }]
});

/**
 * Statics
 */
TaskSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    }
};
/**
 * Delete null comments
 */
TaskSchema.pre('save', function (next) {
  this.comments = this.comments.filter(function(n){ return n !== null; });
  next();
});

mongoose.model('Task', TaskSchema);
