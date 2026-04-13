import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Chatbot from '@site/src/components/Chatbot';

export default function Root({children}: {children: React.ReactNode}) {
  return (
    <>
      {children}
      <BrowserOnly>
        {() => <Chatbot />}
      </BrowserOnly>
    </>
  );
}
