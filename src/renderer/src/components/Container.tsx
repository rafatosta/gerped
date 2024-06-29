import React, { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto flex flex-col justify-start gap-2 p-4 min-h-screen">
      {children}
    </div>
  )
}

export default Container
