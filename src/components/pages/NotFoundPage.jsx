import React from 'react';
import NotFoundMessage from '@/components/organisms/NotFoundMessage';

function NotFoundPage() {
return (
    <div className="min-h-full bg-gradient-to-br from-lightBlue/20 via-lightBlue/5 to-white flex items-center justify-center">
      <NotFoundMessage />
    </div>
  );
}

export default NotFoundPage;