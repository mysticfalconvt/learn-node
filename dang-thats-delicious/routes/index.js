const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
	res.send('Hey! It workz!');
});

module.exports = router;
