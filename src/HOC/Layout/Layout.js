import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import Footer from '../../Components/Navigation/Footer/Footer'
import ProfileDrawer from '../../Components/Navigation/ProfileDrawer/ProfileDrawer'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import Auxi from '../Auxi/Auxi'

const Layout = (props) => {
   const [showSideDrawer, setShowSideDrawer] = useState(false);
   const [showProfileDrawer, setShowProfileDrawer] = useState(false);

   const sideDrawerClosedHandler = () => {
      setShowSideDrawer(false);
   }

   const sideDrawerToggleHandler = () => {
      const setshowSideDrawer = ((prevState) => {
         return !prevState.showSideDrawer
      })
   }

   const profileDrawerClosedHandler = () => {
      setShowProfileDrawer(false)
   }

   const profileDrawerToggleHandler = () => {
      setShowProfileDrawer((prevState) => {
         return !prevState.showProfileDrawer
      })
   }

   let screenHeight = window.screen.height
   return (
      <Auxi >
         <Toolbar
            open={showSideDrawer}
            isAuth={props.isAuthenticated}
            drawerToggleClicked={sideDrawerToggleHandler}
            profileToggleClicked={profileDrawerToggleHandler} />
         <SideDrawer
            isAuth={props.isAuthenticated}
            open={showSideDrawer}
            closed={sideDrawerClosedHandler} />
         <ProfileDrawer
            isAuth={props.isAuthenticated}
            open={showProfileDrawer}
            closed={profileDrawerClosedHandler} />
         <div style={{ minHeight: screenHeight }}>
            {props.children}
         </div>
         <Footer />
      </Auxi>
   )
}

const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null,
      token: state.auth.token
   }
}

export default connect(mapStateToProps)(Layout)