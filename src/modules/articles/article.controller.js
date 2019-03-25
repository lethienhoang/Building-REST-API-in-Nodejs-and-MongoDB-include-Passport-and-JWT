const _ = require('lodash');
const Article = require('./article.model');
const User = require('../users/user.model');
const Comment = require('../comments/comment.model');

exports.article_search_get = async function(req, res) {
    try {

        let limit = 20;
        let offset = 0;
        let query = {};

        if (req.body.query !== undefined) {

            if (typeof req.body.query.limit !== undefined) {
                limit = req.body.query.limit;
            }
    
            if (typeof req.body.query.offset !== undefined) {
                offset = req.body.query.offset;
            }
    
        }
        if (req.body.tags !== undefined &&
            req.body.tags.length > 0) {
            query.tags = { $in : req.body.tags}
        }

        if (req.body.title !== undefined &&
            req.body.title !== '') {
                query.title = { $regex: req.body.title}
        }
       
        
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({createAt:'desc'})
            .populate({path:'author',select:['userName','email', '_id']});

        if (!articles) return res.status(404).send('Articles were not found');

        return res.status(200).send(articles);

    } catch (e) {
        return res.status(500).send(e);
    }
}


exports.feed_get = async function(req, res) {
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
       
        
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({createAt:'desc'})
            .populate({path:'author',select:['userName','email', '_id']});
        if (!articles) return res.status(404).send('Articles were not found');

        return res.status(200).send(articles);

    } catch (e) {
        return res.status(500).send(e);
    }
}

exports.article_post = async function(req, res) {
    try {

        const user = await User.findById(req.payload.id);

        if (!user) return res.status(404).send('User was not found');
        
        const model = new Article(_.pick(req.body, ['title', 'body', 'tags']));
        model.author = user;

        const article = await model.save();
        return res.status(200).send(_.pick(article, ['title', 'body', 'tags']));


    } catch (e) {
        return res.status(500).send(e);
    }
}

exports.article_delete = async function(req, res) {
    try {

        if (!req.payload.id) return res.status(401).send('Authentication was invalid');

        if (!req.body.id) return res.status(400).send('Id was not found');

        const article = await Article.findByIdAndDelete(req.body.id);
        await article.save();
        return res.status(200).send('Delete article is successfully');

    } catch (e) {
        return res.status(500).send(e)
    }
}

exports.article_byUserId_get = async function(req, res) {
    try {

        const articles = await Article.find({ author: req.payload.id}).populate({path:'author',select:['userName','email', '_id']});

        if (!articles) return res.status(404).send('User was not found');

        return res.status(200).send(articles);

    } catch (e) {
        return res.status(500).send(e)
    }
}

exports.article_byId_get = async function(req, res) {
    try {

        const article = await Article.findById(req.body.id).populate({path:'author',select:['userName','email', '_id']});

        if (!article) return res.status(404).send('Article was not found ');

        // const comments = await Comment.find({article: article._id}).populate({path:'author',select:['userName','email', '_id']});

        // article.comments = comments;

        return res.status(200).send(article);
    } catch (e) {
        return res.status(500).send(e)
    }
}