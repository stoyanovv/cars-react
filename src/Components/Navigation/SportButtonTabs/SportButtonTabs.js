import React from 'react'
import styles from './SportButtonTabs.module.css'
import { Link } from 'react-router-dom';


const SportButtonTabs = (props) => {

   let sports = props.sports
   const sportsArray = []
   if (sports) {
      for (const key in sports) {
         sportsArray.push({ key: key, display: sports[key] })
      }
   }


   let body = <React.Fragment></React.Fragment>
   if (sportsArray) {
      body = sportsArray.map(sport => <Link key={sport.key} to={props.match.url + '/' + sport.key}>
         <button className={styles.Button} style={props.location.pathname === props.match.path + '/' + sport.key ? { backgroundColor: "white" } : null} >{sport.display}</button>
      </Link>)
   }
   return (

      <div className={styles.SportsButtons}>
         {body}
      </div>
   );
}

export default SportButtonTabs;