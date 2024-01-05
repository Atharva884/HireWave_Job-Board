import React from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { NavLink, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRightFromBracket, } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';

function SideBar(){
  let cookies = new Cookies();
    function logout(){
        cookies.remove("_id");
        cookies.remove("name");
        cookies.remove("email");
        cookies.remove("role");
    }
    return(
        <>
            <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333" >
                <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <img
                    src={'https://seeklogo.com/images/B/butterfly-logo-0A00378822-seeklogo.com.png'}
                    alt=""
                    style={{ width: '30px' }}
                    /> */}
                    <h6 className="ms-2">That Guys ™</h6>
                </div>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                
                        <NavLink exact to="/" >
                            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/hire" >
                            <CDBSidebarMenuItem icon="user">Hire employees</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/analytics" >
                            <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                        </NavLink>
                        <Link exact to="/profile" >
                            <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                        </Link>
                        <Link exact to="/viewJobPosts" >
                            <CDBSidebarMenuItem icon="sticky-note">View Posts</CDBSidebarMenuItem>
                        </Link>

                       

                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter >
                <div
                    style={{
                    padding: '20px 5px',
                    }}
                >
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                
                        
                        <Link >
                            <CDBSidebarMenuItem icon='signout' onClick={logout}>Log out</CDBSidebarMenuItem>
                        </Link>
      

                       

                    </CDBSidebarMenu>
                </CDBSidebarContent>
                </div>
                </CDBSidebarFooter>
            </CDBSidebar>
            </div>
        </>
    )
}
export default SideBar