const {Router} = require('express');
const bcrypt = require('bcryptjs');
const Article = require('../models/Articles');
const {check, validationResult} = require('express-validator');
const router = Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const paginate = require('express-paginate');


router.get('/', async (req, res, next) => {
    try {
        const [results, itemCount] = await Promise.all([
            Article.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
            Article.count({})
        ]);

        const pageCount = Math.ceil(itemCount / req.query.limit);
        if (req.accepts('json')) {
            res.json({
                object: 'list',
                has_more: paginate.hasNextPages(req)(pageCount),
                pageCount,
                itemCount,
                data:  results
            });

        } else {
            res.send('results',{
                articles: results,
                pageCount,
                itemCount
            })
        }

    } catch (err) {
        next(err);
    }
});

router.post('/create-article', [], async (req, res) => {
        try {
            const {title, description} = req.body;
            const article = new Article({
                title,
                description
            });

            await article.save();

            res.status(201).json({message: 'Статья создана'})
        } catch (e) {
            res.status(500).json({message: 'Что то пошло не так, попробуйте снова'})
        }

    });

router.delete();

router.put();

module.exports = router;