import React, { useEffect, useState } from 'react'
import {
  addMonths,
  subMonths,
  setMonth,
  setYear,
  getYear,
  getMonth,
  format,
  differenceInDays,
  startOfToday
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Drawer, Dropdown, Progress, Timeline, Tooltip } from 'flowbite-react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { LuCalendarClock, LuCalendarPlus, LuCalendarX } from 'react-icons/lu'
import { classNames } from '@renderer/utils/classNames'
import { Link } from 'react-router-dom'
import Order from '@backend/models/Order'

interface CalendarHeaderProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  startYear: number
  endYear: number
  goToFirstOrder: () => void
  scrollRef: React.RefObject<HTMLDivElement>
  delayedOrders: Order[]
}

export const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onDateChange,
  startYear,
  endYear,
  goToFirstOrder,
  scrollRef,
  delayedOrders
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1)
    if (!isPrevDisabled) {
      onDateChange(newDate)
    }
  }

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1)
    if (!isNextDisabled) {
      onDateChange(newDate)
    }
  }

  const handleMonthChange = (month: number) => {
    const newDate = setMonth(currentDate, month)
    onDateChange(newDate)
  }

  const handleYearChange = (year: number) => {
    const newDate = setYear(currentDate, year)
    onDateChange(newDate)
  }

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)

  const isPrevDisabled = getYear(currentDate) === startYear && getMonth(currentDate) === 0
  const isNextDisabled = getYear(currentDate) === endYear && getMonth(currentDate) === 11

  const handleScroll = (event: WheelEvent) => {
    if (event.deltaY < 0) {
      handlePrevMonth()
    } else if (event.deltaY > 0) {
      handleNextMonth()
    }
  }

  useEffect(() => {
    const node = scrollRef.current

    if (node) {
      node.addEventListener('wheel', handleScroll)
    }

    return () => {
      if (node) {
        node.removeEventListener('wheel', handleScroll)
      }
    }
  }, [currentDate])

  const DrawerOrder = () => {
    return (
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-fit overflow-hidden select-none"
      >
        <Drawer.Header
          titleIcon={LuCalendarX}
          title={`Pedidos atrasados (${delayedOrders.length})`}
        />
        <Drawer.Items className="h-full overflow-y-auto px-6">
          <Timeline>
            {delayedOrders.map((o) => (
              <Timeline.Item key={o.id}>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time className="text-red-500 font-semibold flex justify-between">
                    <p>{format(o.deliveryDate, 'dd-MM-yy', { locale: ptBR })}</p>
                    <p>
                      {differenceInDays(startOfToday(), o.deliveryDate)}{' '}
                      {differenceInDays(startOfToday(), o.deliveryDate) > 1 ? 'dias' : 'dia'}
                    </p>
                  </Timeline.Time>
                  <Timeline.Title>
                    <Link to={`/orders/${o.id}`} className="hover:text-cyan-600 hover:underline">
                      {o.theme}
                    </Link>
                  </Timeline.Title>
                  <Timeline.Body className="flex justify-between items-center">
                    <p>{o.Client.name}</p>
                    <p>{(100 * o.countTaskFinished) / o.countTask} %</p>
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        </Drawer.Items>
      </Drawer>
    )
  }

  ;<Tooltip content="Tooltip content"></Tooltip>
  return (
    <div className="grid grid-cols-2 justify-between items-center gap-4">
      <div className="flex flex-row gap-6 items-center">
        {delayedOrders.length > 0 && (
          <Tooltip content={`Pedidos atrasados (${delayedOrders.length})`}>
            <button
              onClick={() => setIsOpen(true)}
              className="text-red-600 font-bold hover:text-gray-900 flex items-center gap-2"
            >
              <LuCalendarX className="min-h-6 min-w-6" />
              <span className="hidden xl:flex">{`Atrasados (${delayedOrders.length})`}</span>
            </button>
          </Tooltip>
        )}
        <Tooltip content="Próximo pedido">
          <button
            onClick={goToFirstOrder}
            className="invisible lg:visible font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <LuCalendarClock className="min-h-6 min-w-6" />
            <span className="hidden lg:flex">Próximo</span>
          </button>
        </Tooltip>

        <Tooltip content="Criar pedido">
          <Link
            to={'/orders/create'}
            className="invisible lg:visible flex font-medium text-gray-600 hover:text-gray-900  items-center gap-2 justify-center"
          >
            <LuCalendarPlus className="min-h-6 min-w-6" />
            <span className="hidden lg:flex">Criar</span>
          </Link>
        </Tooltip>
      </div>

      <div className="flex gap-2 justify-end">
        <div className="flex items-center space-x-2">
          <Dropdown
            label=""
            renderTrigger={() => (
              <span className="font-bold text-blue-600 text-xl cursor-pointer">
                {months[getMonth(currentDate)]}
              </span>
            )}
          >
            {months.map((month, index) => (
              <Dropdown.Item key={index} onClick={() => handleMonthChange(index)}>
                {month}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <Dropdown
            label=""
            renderTrigger={() => (
              <span className="font-bold text-blue-600 text-xl cursor-pointer">
                {getYear(currentDate).toString()}
              </span>
            )}
          >
            {years.map((year) => (
              <Dropdown.Item key={year} onClick={() => handleYearChange(year)}>
                {year}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <div className="flex border rounded-lg px-1 pt-1">
          {/* Previous Month Button */}
          <button
            type="button"
            className={classNames(
              isPrevDisabled ? 'cursor-not-allowed opacity-25' : '',
              'leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none'
            )}
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
          >
            <MdNavigateBefore className="h-6 w-6 text-gray-500 inline-flex leading-none" />
          </button>
          <div className="border-r inline-flex h-6" />
          {/* Next Month Button */}
          <button
            type="button"
            className={classNames(
              isNextDisabled ? 'cursor-not-allowed opacity-25' : '',
              'leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none'
            )}
            onClick={handleNextMonth}
            disabled={isNextDisabled}
          >
            <MdNavigateNext className="h-6 w-6 text-gray-500 inline-flex leading-none" />
          </button>
        </div>
      </div>

      {/* Drawer dos Pedidos atrasados */}
      <DrawerOrder />
    </div>
  )
}

export default CalendarHeader
