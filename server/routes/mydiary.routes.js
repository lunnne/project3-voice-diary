const express = require('express');
const router = express.Router();
const myDiaryController = require('../controller/mydiary');

router.post('/mydiary/create', myDiaryController.createRecording);

router.get('/mydiary', myDiaryController.getAllRecordings);

router.get('/mydiary/:id', myDiaryController.getRecording);

router.delete('/mydiary/:id', myDiaryController.deleteRecording);

module.exports = router;
