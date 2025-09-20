// frontend/assets/js/program_officer.js

// If backend is on port 5000:
// const API_BASE = '/api/program-officer';
// If backend is on port 5003:
const API_BASE = 'http://localhost:5003/api/program-officer';

// Fetch and render events
async function fetchEvents() {
  const res = await fetch(`${API_BASE}/events`);
  const events = await res.json();
  // Table rendering
  const tbody = document.getElementById('upcoming-events-tbody');
  if (tbody) {
    tbody.innerHTML = '';
    events.forEach(ev => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td data-label='Event Name' style="padding:10px 8px;font-weight:600;color:#2c3e50;">${ev.name}</td>
        <td data-label='Date' style="padding:10px 8px;color:#667eea;">${new Date(ev.date).toLocaleDateString()}</td>
        <td data-label='Venue' style="padding:10px 8px;">${ev.venue}</td>
        <td data-label='Time' style="padding:10px 8px;">${ev.time}</td>
        <td data-label='Description' style="padding:10px 8px;">${ev.description || ''}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Populate event dropdown in report form
  const eventDropdown = document.getElementById('reportEventId');
  if (eventDropdown) {
    eventDropdown.innerHTML = '<option value="">Select Event</option>';
    events.forEach(ev => {
      const opt = document.createElement('option');
      opt.value = ev._id;
      opt.textContent = ev.name;
      eventDropdown.appendChild(opt);
    });
  }
}

// Add event
async function handleAddEvent(e) {
  e.preventDefault();
  const form = e.target;
  const eventData = {
    name: form.eventName.value,
    date: form.eventDate.value,
    venue: form.eventVenue.value,
    time: form.eventTime.value,
    description: form.eventDesc.value
  };
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  });
  if (res.ok) {
    fetchEvents();
    form.reset();
    alert('Event added!');
  } else {
    alert('Failed to add event');
  }
}

// Download yearly activity calendar
function downloadCalendar() {
  window.open(`${API_BASE}/calendar/download`, '_blank');
}

// Fetch and render event reports
async function fetchReports() {
  const res = await fetch(`${API_BASE}/reports`);
  const reports = await res.json();
  const list = document.getElementById('event-reports-list');
  if (!list) return;
  list.innerHTML = '';
  reports.forEach(rep => {
    const li = document.createElement('li');
    li.className = 'report-item';
    // Fallback for event name if not populated
    const eventName = (rep.event && rep.event.name) ? rep.event.name : 'Event';
    // Escape single quotes for alert
    const safeDesc = String(rep.description).replace(/'/g, "\\'");
    li.innerHTML = `<strong>${eventName}</strong> <span style="color:#667eea;">(${new Date(rep.reportDate).toLocaleDateString()})</span><br><a href="#" onclick="alert('${safeDesc}')"
    style="color:#764ba2;text-decoration:underline;">Read Report</a>`;
    list.appendChild(li);
  });
}

// Add event report
async function handleAddReport(e) {
  e.preventDefault();
  const form = e.target;
  const reportData = {
    event: form.reportEventId.value,
    reportDate: form.reportDate.value,
    description: form.reportDesc.value
  };
  const res = await fetch(`${API_BASE}/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reportData)
  });
  if (res.ok) {
    fetchReports();
    form.reset();
    alert('Report added!');
  } else {
    alert('Failed to add report');  
  }
}

window.fetchEvents = fetchEvents;
window.handleAddEvent = handleAddEvent;
window.downloadCalendar = downloadCalendar;
window.fetchReports = fetchReports;
window.handleAddReport = handleAddReport;

