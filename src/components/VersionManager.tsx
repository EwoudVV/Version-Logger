import React, { useState } from 'react';
import type { Version } from './VersionEntry';
import { VersionList } from './VersionList';
import { VersionForm } from './VersionForm';

export function VersionManager() {
  const [versions, setVersions] = useState<Version[]>([]);

  const handleSubmit = (newVersion: Version) => {
    setVersions(prevVersions => [newVersion, ...prevVersions]);
  };

  return (
    <div>
      <div className="version-form-section">
        <h2>Add New Version</h2>
        <VersionForm onSubmit={handleSubmit} />
      </div>
      <VersionList versions={versions} />
    </div>
  );
}