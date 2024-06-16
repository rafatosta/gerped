import { Button, ButtonProps } from 'flowbite-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'

const Title: React.FC<ButtonProps> = ({ disabled, children }) => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      {!disabled && (
        <Button onClick={() => navigate(-1)} color="gray" className="rounded-full w-6 h-6 items-center">
          <IoChevronBack />
        </Button>

      )}
      <h5 className="text-2xl font-bold tracking-tight text-gray-900">{children}</h5>
    </div>
  )
}

export default Title
