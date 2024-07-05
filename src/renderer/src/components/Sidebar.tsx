import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar as Sbar } from 'flowbite-react'
import { AiFillHome } from 'react-icons/ai'
import { FaUsers, FaShoppingCart, FaServicestack, FaInfoCircle } from 'react-icons/fa'
import favicon from '../assets/favicon.svg'
import { SidebarTheme } from '@renderer/theme/SidebarTheme'

const Sidebar: React.FC = () => {
  const location = useLocation()

  

  return (
    <Sbar theme={SidebarTheme} aria-label="Default sidebar" className="fixed">
      <Sbar.Logo href="/" img={favicon} imgAlt="logo">
        GerPed
      </Sbar.Logo>
      <Sbar.Items>
        <Sbar.ItemGroup>
          <Sbar.Item as={Link} to="/" active={location.pathname === '/'} icon={AiFillHome}>
            Início
          </Sbar.Item>
          <Sbar.Item as={Link} to="/clients" active={location.pathname.includes('/clients')} icon={FaUsers}>
            Clientes
          </Sbar.Item>
          <Sbar.Item as={Link} to="/orders" active={location.pathname.includes('/orders')} icon={FaShoppingCart}>
            Pedidos
          </Sbar.Item>
          <Sbar.Item as={Link} to="/services" active={location.pathname.includes('/services')} icon={FaServicestack}>
            Serviços
          </Sbar.Item>
          <Sbar.Item as={Link} to="/about" active={location.pathname.includes('/about')} icon={FaInfoCircle}>
            Sobre
          </Sbar.Item>
        </Sbar.ItemGroup>
      </Sbar.Items>
    </Sbar>
  )
}

export default Sidebar
