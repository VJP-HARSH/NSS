const { Event, EventReport } = require('../models/event');
const path = require('path');

// Event CRUD
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add event' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete event' });
  }
};

// Event Report CRUD
exports.getReports = async (req, res) => {
  try {
    const reports = await EventReport.find().populate('event').sort({ reportDate: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

exports.addReport = async (req, res) => {
  try {
    const report = new EventReport(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add report' });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await EventReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update report' });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await EventReport.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete report' });
  }
};

// Download yearly activity calendar (dummy PDF)
exports.downloadCalendar = (req, res) => {
  const filePath = path.join(__dirname, '../uploads/Yearly_Activity_Calendar.pdf');
  res.download(filePath, 'Yearly_Activity_Calendar.pdf');
};
