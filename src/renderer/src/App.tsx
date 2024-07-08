import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import About from './pages/About'
import Clients from './pages/Clients'
import ClientDetails from './pages/ClientDetails'
import Services from './pages/Services'
import Orders from './pages/Orders'
import OrderForm from './pages/OrderForm'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-row h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 ml-64 h-screen overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/:id" element={<ClientDetails />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/create" element={<OrderForm />} />
              <Route path="/orders/create/:clientId" element={<OrderForm />} />
              <Route path="/orders/:orderId" element={<OrderForm />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
