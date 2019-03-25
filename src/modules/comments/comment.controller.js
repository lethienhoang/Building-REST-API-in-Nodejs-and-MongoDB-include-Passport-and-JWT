const Comment = require('./comment.model');
const _ = require('lodash');
const Article = require('../articles/article.model');
const User = require('../users/user.model');

exports.comment_post = async function(req, res) {
    try {
        if (!req.payload.id) return res.status(401).send('Authentication was invalid');

        if (!req.body.articleId)  return res.status(404).send('Article was not found');

        const user = await User.findById(req.payload.id);
        const article = await Article.findById(req.body.articleId);

        const model = new Comment(_.pick(req.body, ['comment']));
        model.author = user;
        model.article = article;

        const comment = await model.save();

        return res.status(200).send(comment.select('-author'));

    } catch (e) {
        return res.status(500).send(e);
    }
}

exports.comment_get =  async function(req, res) {
    try {

        let limit = 20;
        let offset = 0;

        if (req.body.query !== undefined) {

            if (typeof req.body.query.limit !== undefined) {
                limit = req.body.query.limit;
            }
    
            if (typeof req.body.query.offset !== undefined) {
                offset = req.body.query.offset;
            }
    
        }      

        if (!req.body.articleId)  return res.status(404).send('Article was not found');

        const comments = Comment.findById(req.body.articleId)
        .limit(Number(limit))
            .skip(Number(offset))
            .sort({createAt:'desc'})
            .populate({path:'author',select:['userName','email', '_id']});

        return res.status(200).send(comments);
    } catch (e) {
        return res.status(500).send(e);
    }
}