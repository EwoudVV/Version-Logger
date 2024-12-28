import React, { useState } from 'react';
import type { Version } from './VersionEntry';

interface VersionFormProps {
  onSubmit: (version: Version) => void;
}

export function VersionForm({ onSubmit }: VersionFormProps) {
  const [version, setVersion] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<'stable' | 'beta' | 'alpha'>('stable');
  const [summary, setSummary] = useState('');
  const [changes, setChanges] = useState<Array<{ type: string; description: string }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      version,
      date,
      status,
      summary,
      changes
    });
  };

  const addChange = () => {
    setChanges([...changes, { type: 'feature', description: '' }]);
  };

  return (
    <form onSubmit={handleSubmit} className="version-form">
      <div className="form-group">
        <label>Version:</label>
        <input
          type="text"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          placeholder="1.0.0"
          required
        />
      </div>

      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
          <option value="stable">Stable</option>
          <option value="beta">Beta</option>
          <option value="alpha">Alpha</option>
        </select>
      </div>

      <div className="form-group">
        <label>Summary:</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div className="changes-section">
        <h3>Changes</h3>
        {changes.map((change, index) => (
          <div key={index} className="change-entry">
            <select
              value={change.type}
              onChange={(e) => {
                const newChanges = [...changes];
                newChanges[index].type = e.target.value;
                setChanges(newChanges);
              }}
            >
              <option value="feature">Feature</option>
              <option value="bugfix">Bug Fix</option>
              <option value="improvement">Improvement</option>
              <option value="breaking">Breaking Change</option>
              <option value="deprecation">Deprecation</option>
            </select>
            <input
              type="text"
              value={change.description}
              onChange={(e) => {
                const newChanges = [...changes];
                newChanges[index].description = e.target.value;
                setChanges(newChanges);
              }}
              placeholder="Description"
            />
          </div>
        ))}
        <button type="button" onClick={addChange}>Add Change</button>
      </div>

      <button type="submit">Save Version</button>
    </form>
  );
}