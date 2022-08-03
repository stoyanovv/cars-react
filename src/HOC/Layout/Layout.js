import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../../Components/Navigation/Footer/Footer'
import ProfileDrawer from '../../Components/Navigation/ProfileDrawer/ProfileDrawer'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import Auxi from '../Auxi/Auxi'

class Layout extends Component {
   constructor(props) {
      super(props)

      this.state = {
         showSideDrawer: false,
         showProfileDrawer: false
      }
   }
   sideDrawerClosedHandler = () => {
      this.setState({
         showSideDrawer: false
      })
   }
   sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
         return {
            showSideDrawer: !prevState.showSideDrawer
         }
      })
   }
   profileDrawerClosedHandler = () => {
      this.setState({
         showProfileDrawer: false
      })
   }
   profileDrawerToggleHandler = () => {
      this.setState((prevState) => {
         return {
            showProfileDrawer: !prevState.showProfileDrawer
         }
      })
   }

   render() {
      let screenHeight = window.screen.height
      return (
         <Auxi >
            <Toolbar
               open={this.state.showSideDrawer}
               isAuth={this.props.isAuthenticated}
               drawerToggleClicked={this.sideDrawerToggleHandler}
               profileToggleClicked={this.profileDrawerToggleHandler} />
            <SideDrawer
               isAuth={this.props.isAuthenticated}
               open={this.state.showSideDrawer}
               closed={this.sideDrawerClosedHandler} />
            <ProfileDrawer
               isAuth={this.props.isAuthenticated}
               open={this.state.showProfileDrawer}
               closed={this.profileDrawerClosedHandler} />
            <div style={{ minHeight: screenHeight }}>
               {this.props.children}
            </div>
            <Footer />
         </Auxi>
      )
   }
}

const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null,
      token: state.auth.token
   }
}

export default connect(mapStateToProps)(Layout)