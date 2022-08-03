import React, { Component } from 'react'
import styles from './HomePage.module.css'
import CarsSlideShow from '../../Other/CarsSlideShow/CarsSlideShow';
import Data from '../../../Data/Data';

export default class HomePage extends Component {
   state = {
      cars: [],
      firstIndex: 0,
      lastIndex: 4
   }

   ClickHandler = (event, direction) => {
      if (direction) {
         let lastIndex = this.state.lastIndex - 2
         let firstIndex = lastIndex - 4
         if (this.state.cars[lastIndex]) {
            this.setState({
               firstIndex: firstIndex,
               lastIndex: lastIndex
            })
         }
      }
      else {
         let firstIndex = this.state.firstIndex + 2
         let lastIndex = firstIndex + 4
         if (this.state.cars[firstIndex]) {
            this.setState({
               firstIndex: firstIndex,
               lastIndex: lastIndex
            })
         }
      }
   }

   componentDidMount() {
      Data.get('cars')
         .then({
         })
      Data.get('shop')
         .then(response => {
            const cars = response
            this.setState({ cars: cars })
         })
   }

   render() {
      return (
         <div className={styles.MainDiv}>
            <div className={styles.Container}>
               <div className={styles.Col}>
                  <h4 className={styles.Header}>При нас можеш да намериш най-добрите оферти</h4>
                  <img className={styles.PicturesContainer} alt='no pic' src="https://www.mansworldindia.com/wp-content/uploads/2020/06/20200604_185056_0000.png"></img>
               </div>
               <div className={styles.Col}>
                  <h4 className={styles.Header}>Избери своя автомобил</h4>
                  <CarsSlideShow
                     cars={this.state.cars}
                     firstIndex={this.state.firstIndex}
                     lastIndex={this.state.lastIndex}
                     clicked={this.ClickHandler} />
               </div>

            </div>
            <div className={styles.Banner} >
               <img className={styles.Image} alt='no pic' src={"https://www.autoclub.bg/wp-content/uploads/2022/03/audi-a6-avant-e-tron-concept-front-angle-low-passenger.jpg"} />
               <div className={styles.BannerHeaders}>
                  <div className={styles.BannerHeader}>Регистрирай се сега</div>
                  <div className={styles.BannerHeader}>Получи достъп до нашите екслузивни оферти</div>
                  <div className={styles.BannerHeader}>Намери своята кола</div>
                  <div className={styles.BannerHeader}>Всичко става онлайн</div>
               </div>
               <img className={styles.Image} alt='no pic' src={"https://images.alphacoders.com/937/thumb-1920-937063.jpg"} />

            </div>
         </div>
      )
   }
}
