import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="p-4 h-full overflow-y-auto">
      {children}
    </div>
  );
};

export default Container;
