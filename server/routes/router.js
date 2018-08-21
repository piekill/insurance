const express = require('express');
const rosterCtrl = require('../controller/roster_ctrl');
const loginCtrl = require('../controller/login_ctrl');

const router = express.Router();

router.get('/api/roster/query', rosterCtrl.query);
router.get('/api/roster/classlist', rosterCtrl.classlist);
router.post('/api/roster/update', rosterCtrl.update);
router.post('/api/roster/add', rosterCtrl.add);
router.post('/api/roster/change', rosterCtrl.change);
router.post('/api/login', loginCtrl.login);
router.get('/api/roster/overview', rosterCtrl.overview);

module.exports = router;
