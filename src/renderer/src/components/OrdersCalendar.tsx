import {
  startOfMonth,
  endOfMonth,
  format,
  isSameDay,
  startOfWeek,
  endOfWeek,
  addDays,
  differenceInDays,
  startOfToday
} from 'date-fns'

import Order from '@backend/models/Order'
import { ptBR } from 'date-fns/locale'
import CalendarHeader from './CalendarHeader'
import { useEffect, useRef, useState } from 'react'
import { classNames } from '@renderer/utils/classNames'
import { Popover } from 'flowbite-react'
import { Link } from 'react-router-dom'

interface CalendarProps {
  orders: Order[]
}

const getEventClass = (deliveryDate: Date): string => {
  // Marcar pedidos atrasados
  if (differenceInDays(startOfToday(), deliveryDate) > 1) {
    return 'border-red-200 text-gray-100 font-semibold bg-red-600'
  }

  const diffDays = differenceInDays(deliveryDate, startOfToday())
  if (diffDays <= 7) {
    return 'border-red-200 text-red-800 bg-red-100'
  } else if (diffDays <= 14) {
    return 'border-yellow-200 text-yellow-800 bg-yellow-100'
  } else if (diffDays <= 30) {
    return 'border-green-200 text-green-800 bg-green-100'
  } else {
    return 'border-blue-200 text-blue-800 bg-blue-100'
  }
}

function Calendar({ orders }: CalendarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [delayedOrders, setDelayedOrders] = useState<Order[]>([])

  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [firstOrderDate, setFirstOrderDate] = useState<Date | null>(null)
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear())
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear())

  const start = startOfMonth(currentDate)
  const end = endOfMonth(currentDate)

  const startDay = startOfWeek(start)
  const endDay = endOfWeek(end)

  const getOrdersForDay = (day: Date) => {
    return orders.filter((order) => isSameDay(new Date(order.deliveryDate), day))
  }

  const goToFirstOrder = () => {
    if (orders.length > 0) {
      setCurrentDate(new Date(orders[0].deliveryDate))
    }
  }

  const renderDays = () => {
    const daysElements: JSX.Element[] = []
    let day = startDay
    while (day <= endDay) {
      const isFirstOrderDay = firstOrderDate && isSameDay(day, firstOrderDate)
      const dayOrders = getOrdersForDay(day)
      const eventClass =
        dayOrders.length > 0 && firstOrderDate ? getEventClass(dayOrders[0].deliveryDate) : ''

      daysElements.push(
        <div
          key={day.toISOString()}
          className={classNames(
            `p-1 border-r border-b flex flex-col`,
            start.getMonth() != day.getMonth() ? 'bg-gray-100 opacity-50 grayscale-[50%]' : '',
            isFirstOrderDay ? 'border bg-red-50 border-red-500' : '',
            startOfToday().toString() == day.toString() ? 'border border-blue-500 bg-blue-50' : ''
          )}
        >
          <div className="flex justify-between items-center">
            <div className={classNames('text-xs p-1 font-semibold text-left')}>
              {format(day, 'd')}
              {format(day, 'd') == '1' && <span> {format(day, 'MMM', { locale: ptBR })}</span>}
            </div>
            {startOfToday().toString() == day.toString() ? (
              <p className="text-gray-600 text-sm font-semibold">Hoje</p>
            ) : (
              ''
            )}
          </div>

          <div className='grid grid-flow-row'>
            {getOrdersForDay(day).map((order) => (
              start.getMonth() == day.getMonth() ?
                <Popover
                  key={order.id}
                  aria-labelledby="default-popover"
                  aria-disabled
                  content={
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {/* Title */}
                      <div className="border-b border-gray-200 bg-gray-100 p-3 gap-y-3 flex flex-col justify-center items-center">
                        <h3 id="default-popover" className="font-semibold text-xl text-gray-900">
                          {order.theme}
                        </h3>
                        <h3 className="font-semibold text-gray-500">
                          {format(order.deliveryDate, 'dd MMMM yyyy', { locale: ptBR })}
                        </h3>
                      </div>
                      {/* Body */}
                      <div className="flex flex-col p-3 gap-2">
                        <p>Cliente: <span className='text-gray-900 font-medium'>{order.Client.name}</span> </p>
                        <p>Serviço: <span className='text-gray-900 font-medium'>{order.Service.description}</span></p>
                        <p>Data do pedido: <span className='text-gray-900 font-medium'>{format(order.orderDate, 'dd/MM/yyyy', { locale: ptBR })}</span></p>
                        <p>Data da entrega: <span className='text-gray-900 font-medium'>{format(order.deliveryDate, 'dd/MM/yyyy', { locale: ptBR })}</span></p>
                        <p>Valor: <span className='text-gray-900 font-medium'> R$ {order.price}</span></p>
                        <p>Tarefas a concluir:
                          <span className='text-gray-900 font-medium'>
                            {order.countTask == 0 ? " Sem tarefas cadastradas" : ` ${order.countTaskFinished} de ${order.countTask}`}
                          </span>
                        </p>
                      </div>
                      {/* Button */}
                      <Link
                        to={`/orders/${order.id}`}
                        className="flex justify-center items-center border-t p-4 w-full hover:bg-gray-100  text-sm font-semibold text-gray-900"
                      >
                        Abrir pedido
                      </Link>

                    </div>
                  }
                >
                  <button
                    className={classNames(
                      'p-1 text-nowrap md:text-sm rounded-lg mt-1 overflow-hidden border truncate text-start',
                      eventClass
                    )}
                  >
                    {order.Client?.name}
                  </button>
                </Popover>
                :
                <button
                  className={classNames(
                    'p-1 text-nowrap md:text-sm rounded-lg mt-1 overflow-hidden border truncate text-start',
                    eventClass
                  )}
                >
                  {order.Client?.name}
                </button>
            ))}
          </div>
        </div>
      )
      day = addDays(day, 1)
    }
    return daysElements
  }

  const renderWeekDays = () => {
    const weekDaysElements: JSX.Element[] = []
    for (let i = 0; i < 7; i++) {
      weekDaysElements.push(
        <div key={i} className="p-2 text-start font-semibold h-fit text-sm text-gray-500">
          {format(addDays(startOfWeek(currentDate), i), 'EEEEEE', { locale: ptBR }).toUpperCase()}
        </div>
      )
    }
    return weekDaysElements
  }

  useEffect(() => {
    const deliveryDates = orders.map((order) => new Date(order.deliveryDate))
    const minYear = Math.min(...deliveryDates.map((date) => date.getFullYear()))
    const maxYear = Math.max(...deliveryDates.map((date) => date.getFullYear()))

    setStartYear(minYear)
    setEndYear(maxYear)

    if (orders.length > 0) {
      const firstOrder = new Date(orders[0].deliveryDate)
      setCurrentDate(firstOrder)
      setFirstOrderDate(firstOrder)
    } else {
      setCurrentDate(new Date())
    }

    const filtered = orders.filter(
      (order) => differenceInDays(startOfToday(), order.deliveryDate) > 1
    )
    setDelayedOrders(filtered)
  }, [orders])

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        startYear={startYear}
        endYear={endYear}
        goToFirstOrder={goToFirstOrder}
        scrollRef={scrollRef}
        delayedOrders={delayedOrders}
      />
      <div className="grid grid-cols-7">{renderWeekDays()}</div>
      <div ref={scrollRef} className="flex-1 grid grid-cols-7 border-l border-t">
        {renderDays()}
      </div>
    </div>
  )
}

export default Calendar
