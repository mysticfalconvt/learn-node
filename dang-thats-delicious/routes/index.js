const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
	res.send('Hey! It workzz!');
	console.log('stuffsss');
});

module.exports = router;
console.log('asdffffffff');
