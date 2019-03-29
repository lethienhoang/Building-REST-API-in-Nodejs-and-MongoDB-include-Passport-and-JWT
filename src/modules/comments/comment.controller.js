const Comment = require('./comment.model');
const _ = require('lodash');
const Article = require('../articles/article.model');
const User = require('../users/user.model');

exports.comment_post = async function(req, res) {
    try {
        if (!req.payload.id) return res.status(401).send('Authentication was invalid');

        if (!req.params.id)  return res.status(404).send('Article was not found');
        const user = await User.findById(req.payload.id);
        const article = await Article.findById(req.params.id);

        if (!user)  return res.status(404).send("User was not found");
        if (!article) return res.status(404).send("Article was not found")
        const model = new Comment(_.pick(req.body, ['comment']));
        model.author = user;
        model.article = article;

        const comment = await model.save();

        return res.status(200).send(_.pick(comment, ['_id','comment','article']));

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

        console.log(req.params.id);
        if (!req.params.id)  return res.status(404).send('Id was not found');

        const comments = await Comment.findById(req.params.id)
        .limit(Number(limit))
            .skip(Number(offset))
            .sort({createAt:'desc'})
            .populate({path:'author',select:['userName','email', '_id']});

        if (!comments) return res.status(404).send('Comment was not found');

        return res.status(200).send(comments);
    } catch (e) {
        return res.status(500).send(e);
    }
}