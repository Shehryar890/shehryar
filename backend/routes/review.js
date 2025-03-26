const authenticate = require('../middlerwares/auth');
const express = require('express');

const router= express.Router();

const {
    saveReview,
    getReviews,
} = require('../controller/review');



        router.post('/', authenticate, saveReview);
        router.get('/:productId', authenticate, getReviews);

        module.exports = router;