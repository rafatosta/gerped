import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar as Sbar } from 'flowbite-react'
import favicon from '../assets/favicon.svg'

const Sidebar: React.FC = () => {
    return (
        <Sbar aria-label="Default sidebar" className="fixed">
            <Sbar.Logo href="/" img={favicon} imgAlt="logo">
                GerPed
            </Sbar.Logo>
            <Sbar.Items>
                <Sbar.ItemGroup>
                    <Sbar.Item as={Link} to="/">
                        Início
                    </Sbar.Item>
                    <Sbar.Item as={Link} to="/client" >
                        Clientes
                    </Sbar.Item>
                    <Sbar.Item href="/about">
                        Sobre
                    </Sbar.Item>
                </Sbar.ItemGroup>
            </Sbar.Items>
        </Sbar>
    );
};

export default Sidebar;
