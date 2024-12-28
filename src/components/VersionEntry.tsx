import React from 'react';
import { format } from 'date-fns';

interface Change {
  type: 'feature' | 'bugfix' | 'improvement' | 'breaking' | 'deprecation';
  description: string;
}

export interface Version {
  version: string;
  date: string;
  status: 'stable' | 'beta' | 'alpha';
  summary: string;
  changes: Change[];
}

export function VersionEntry({ version, date, status, summary, changes }: Version) {
  return (
    <div className="version-entry">
      <h2>
        Version {version}
        <span className={`status ${status}`}>{status}</span>
        <span className="date">{format(new Date(date), 'MMM d, yyyy')}</span>
      </h2>
      <p className="summary">{summary}</p>
      
      {['feature', 'bugfix', 'improvement', 'breaking', 'deprecation'].map(type => {
        const typeChanges = changes.filter(change => change.type === type);
        if (typeChanges.length === 0) return null;
        
        return (
          <div key={type} className="change-section">
            <h3>{type.charAt(0).toUpperCase() + type.slice(1)}s</h3>
            <ul>
              {typeChanges.map((change, index) => (
                <li key={index}>{change.description}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}