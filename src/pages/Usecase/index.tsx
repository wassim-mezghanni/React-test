import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import UC001 from './UC001';

export default function UseCaseDispatcher() {
  const { id } = useParams<{ id: string }>();

  // Map of Use Case IDs to components
  const components: Record<string, ReactElement> = {
    'UC_001': <UC001 />,
    'variance_analysis': <UC001 />, // Alias
  };

  const Component = components[id || ''] || (
    <div className="p-20 text-center">
      <h1 className="text-2xl font-bold text-on-surface">Use Case Not Found</h1>
      <p className="text-outline">The requested use case ID "{id}" does not exist or is not yet implemented.</p>
    </div>
  );

  return Component;
}
