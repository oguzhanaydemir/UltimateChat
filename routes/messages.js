const express = require('express');
const router = express.Router();
const Messages = require('../src/libs/Messages');

router.get('/list', function(req, res, next) {
    Messages.list(req.query.roomId, (messages) => {
        res.json(messages);
    });
   // res.json(messages);    
});

module.exports = router;
