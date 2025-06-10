import React from 'react';
import NotFoundMessage from '@/components/organisms/NotFoundMessage';

function NotFoundPage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center">
      <NotFoundMessage />
    </div>
  );
}

export default NotFoundPage;