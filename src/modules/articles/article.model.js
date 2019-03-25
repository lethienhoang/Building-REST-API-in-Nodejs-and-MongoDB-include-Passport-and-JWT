const moongoose = require('mongoose');
const User = moongoose.model('User');

const ArticleSchame = new moongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        
    },
    body: {
        type: String,
        required: [true, 'Content of article is required']
    },
    tags: [{
        type: String
    }],
    favoritesCount: {
        type: Number,
        default: 0
    },
    author: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    }
}, { timestamps: true });


module.exports = moongoose.model('Article', ArticleSchame);

