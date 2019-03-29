const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    article: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Article'
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
