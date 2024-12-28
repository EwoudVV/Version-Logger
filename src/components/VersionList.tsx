import React from 'react';
import type { Version } from './VersionEntry';
import { VersionEntry } from './VersionEntry';
import { EmptyState } from './EmptyState';

interface VersionListProps {
  versions: Version[];
}

export function VersionList({ versions }: VersionListProps) {
  if (versions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="version-log">
      {versions.map((version, index) => (
        <VersionEntry key={index} {...version} />
      ))}
    </div>
  );
}