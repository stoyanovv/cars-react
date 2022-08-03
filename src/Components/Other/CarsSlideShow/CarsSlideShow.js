import React from 'react'
import styles from './CarsSlideShow.module.css'
import TriangleButton from '../../UI/Buttons/TriangleButton/TriangleButton';
import CarIcon from '../../UI/CarIcon/CarIcon';

const CarsSlideShow = (props) => {

   const cars = []

   if (props.cars.length > 0) {
      props.cars.forEach(car => {
         cars.push(<CarIcon
            key={`${car.model}_${car.make}`}
            name={car.make}
            img={car.imgUrl} />)
      })
   };

   return (
      <div className={styles.CarsSlideShow}>
         <TriangleButton disabled={props.firstIndex === 0} left clicked={(event, direction = true) => { props.clicked(event, direction) }} />
         <div className={styles.CarsIcons} >
            {cars.slice(props.firstIndex, props.lastIndex)
               .map(car => (car))}
         </div>
         <TriangleButton disabled={props.lastIndex >= cars.length} clicked={(event) => { props.clicked(event) }} />
      </div>
   );
}

export default CarsSlideShow