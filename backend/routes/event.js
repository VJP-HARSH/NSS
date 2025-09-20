const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Event CRUD
router.get('/events', eventController.getEvents);
router.post('/events', eventController.addEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

// Event Report CRUD
router.get('/reports', eventController.getReports);
router.post('/reports', eventController.addReport);
router.put('/reports/:id', eventController.updateReport);
router.delete('/reports/:id', eventController.deleteReport);

// Download yearly activity calendar
router.get('/calendar/download', eventController.downloadCalendar);

module.exports = router;
