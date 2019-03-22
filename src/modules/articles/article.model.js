const moongoose = require('mongoose');
const User = moongoose.model('User');

const ArticleSchame = new moongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        
    },
    body: String,
    comment: [{
        type: moongoose.Schema.Types.ObjectId, 
        ref: 'Comment'       
    }],
    tags: [{
        type: String
    }],
    favoritesCount: {
        type: Number,
        default: 0
    },
    author: {
        type: moongoose.Schema.Types.ObjectId, ref: 'User'
    }
}, { timestamps: true });


module.exports = moongoose.model('Article', ArticleSchame);

