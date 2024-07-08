// FloatingSelect.tsx
import React, { ReactNode, useState, useEffect, SelectHTMLAttributes } from 'react'
import { MdArrowDropDown } from 'react-icons/md'

interface FloatingSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  children?: ReactNode
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({
  label,
  children,
  value,
  onChange,
  ...props
}) => {
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    setHasValue(value !== undefined && value !== '')
  }, [value])

  return (
    <div className="relative">
      <select
        id="floating_filled"
        value={value}
        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        onChange={(e) => {
          onChange && onChange(e)
          setHasValue(e.target.value !== '')
        }}
        {...props}
      >
        <option value="">{label}</option>
        {children}
      </select>

      <label
        htmlFor="floating_filled"
        className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform ${
          hasValue ? '-translate-y-4 scale-75 top-4' : 'top-5'
        } z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500`}
      >
        {label}
      </label>

      <MdArrowDropDown
        className="absolute right-2 top-5 text-gray-500 pointer-events-none"
        size={24}
      />
    </div>
  )
}

export default FloatingSelect
