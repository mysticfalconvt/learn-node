const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
	  const isPhoto = file.mimetype.startsWith('image/');
	  if(isPhoto) {
		next(null, true);
	  } else {
		next({ message: 'That filetype isn\'t allowed!' }, false);
	  }
	}
  };

exports.homePage = (req, res) => {
	res.render('index', { title: 'Rob is Hangry' });
};

exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store' });
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
	if (!req.file) {
		console.log(req.file)
		next(); //skip to next middleware
		return;
	} ;
	console.log(req.file);
};

exports.createStore = async (req, res) => {
	const store = await (new Store(req.body)).save();
	req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
	res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req,res) =>{
	// 1. querey the database
	const stores = await Store.find();
	res.render('stores', {title: 'Stores', stores: stores});
};

exports.editStore = async (req, res) => {
	//find the store given id
	const store = await Store.findOne({_id: req.params.id});

	//confirm they are owner of the store

	//render out the edit form so they can edit
	res.render('editStore', {title: `edit ${store.name}`, store})
};

exports.updateStore = async (req, res) => {
	// set the location data to be a point
	req.body.location.type = 'Point';
	// find and update store 
	const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, { 
		new: true, 
		runValidators: true
	}).exec();
	// redirect to the store and tell them it worked
	req.flash('success', `Sucessfully Updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`);
	res.redirect(`/stores/${store.id}/edit`);
};