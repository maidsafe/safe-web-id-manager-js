import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import {PATHS} from '../../constants';

const Header = ( props ) =>
{
    const selectedKeys = [];
    const location = props.location.pathname;

    // set menu as active on load if on a specific path
    Object.keys( PATHS ).forEach( path =>
    {
        location.startsWith( PATHS[path] ) ? selectedKeys.push( PATHS[path] ) : '';
    } );

    return (
        <div>
            <h1>WebId Manager</h1>
            <Menu mode="horizontal" selectedKeys={ selectedKeys }>
                <Menu.Item key={ PATHS.LIST }>
                    <NavLink to={ PATHS.LIST } >List</NavLink>
                </Menu.Item>
                <Menu.Item key={ PATHS.CREATE }>
                    <NavLink to={ PATHS.CREATE } >Create</NavLink>
                </Menu.Item>
                <Menu.Item key={ PATHS.EDIT }>
                    <NavLink to={ PATHS.EDIT } >Edit</NavLink>
                </Menu.Item>
            </Menu>
        </div>

    );
};

export default Header;
