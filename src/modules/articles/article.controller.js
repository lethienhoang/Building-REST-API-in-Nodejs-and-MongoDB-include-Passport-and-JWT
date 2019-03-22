const _ = require('lodash');
const Article = require('./article.model');
const User = require('../users/user.model');

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
            .populate('author', '_id');

        if (!articles) return res.status(404).send('Articles are not found');

        return res.status(200).send(articles);

    } catch (e) {
        return res.status(500).send(e);
    }
}

exports.article_post = async function(req, res) {
    try {

        const user = await User.findById(req.payload.id);

        if (!user) return res.status(404).send('User is not found');
        
        const model = new Article(_.pick(req.body, ['title', 'body', 'tags']));
        model.author = user;

        const article = await model.save();
        return res.status(200).send(article);


    } catch (e) {
        return res.status(500).send(e)
    }
}

exports.article_delete = async function(req, res) {
    try {

    } catch (e) {
        return res.status(500).send(e)
    }
}

exports.article_byUserId_get = async function(req, res) {
    try {

    } catch (e) {
        return res.status(500).send(e)
    }
}

exports.article_byId_get = async function(req, res) {
    try {

    } catch (e) {
        return res.status(500).send(e)
    }
}