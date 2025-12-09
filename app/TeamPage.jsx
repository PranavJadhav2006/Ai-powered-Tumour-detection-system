import React, { useState } from 'react';
import './TeamPage.css';

const TeamPage = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Dr. Smith', message: 'Reviewing Case #12345. Looks good.', timestamp: '10:30 AM' },
    { id: 2, user: 'Dr. Jones', message: '@Dr.Smith please review slice 42', timestamp: '10:35 AM' },
  ]);
  const [pinnedNotes, setPinnedNotes] = useState([
    { id: 1, note: 'Important: Check for edema in T2 FLAIR', user: 'Dr. Smith', tags: ['#Important', '#Follow-up'] },
  ]);
  const [assignments, setAssignments] = useState([
    { id: 1, caseId: 'C12345', reviewer: 'Dr. Jones', status: 'Pending', dueDate: '2023-11-01' },
    { id: 2, caseId: 'C12344', reviewer: 'Dr. Smith', status: 'Completed', dueDate: '2023-10-28' },
  ]);

  return (
    <div className="team-page">
      <h1>Team / Notes</h1>

      <div className="team-layout">
        <div className="chat-feed">
          <h2>Case-level Chat Feed</h2>
          <div className="messages-list">
            {chatMessages.map(msg => (
              <div className="message-item" key={msg.id}>
                <span className="user">{msg.user}:</span>
                <span className="message">{msg.message}</span>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            ))}
          </div>
          <textarea placeholder="Type your message here..."></textarea>
          <button className="send-btn">Send</button>
        </div>

        <div className="pinned-notes">
          <h2>Pinned Notes</h2>
          <div className="notes-list">
            {pinnedNotes.map(note => (
              <div className="note-item" key={note.id}>
                <p>{note.note}</p>
                <div className="note-meta">
                  <span className="user">{note.user}</span>
                  <div className="tags">
                    {note.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reviewer-assignments">
        <h2>Reviewer Assignments</h2>
        <table className="assignments-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Assigned Reviewer</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(assignment => (
              <tr key={assignment.id}>
                <td>{assignment.caseId}</td>
                <td>{assignment.reviewer}</td>
                <td>{assignment.status}</td>
                <td>{assignment.dueDate}</td>
                <td>
                  <button className="table-action-btn">Assign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="activity-feed">
        <h2>Activity Feed</h2>
        <p>Timeline of case actions (uploads, edits, approvals)</p>
      </div>
    </div>
  );
};

export default TeamPage;
