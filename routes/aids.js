const express = require('express');
const router = express.Router();
const Aid = require('../models/aid');
const { checklogin, checkuser } = require('../middleware');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const wrapAsync = require("../utils/wrapAsync.js");
const aidsController = require('../controller/aids');


// List all aids
router.get('/', aidsController.index);

// New aid form
router.get('/new', checklogin, aidsController.newaidform);

// Create aid
router.post('/', checklogin,aidsController.postnewaid);

// Show aid
router.get('/:id', checklogin,aidsController.showaid);

// Edit aid form
router.get('/:id/edit', checklogin, checkuser, wrapAsync(aidsController.editaidform));

// Update aid
router.put('/:id', checkuser, wrapAsync(aidsController.putedits));

// Delete aid
router.delete('/:id', checkuser, wrapAsync(aidsController.deleteaid));

module.exports = router;