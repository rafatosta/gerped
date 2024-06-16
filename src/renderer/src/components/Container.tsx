import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto flex flex-col justify-center gap-2 p-4 max-h-screen">
      {children}
    </div>
  );
};

export default Container;
