import React from 'react'
import '../CovidSummary/CovidSummary.css'


const CovidSummary = (props)=>{
   return ( <div className="report">
    <h4>Total Cases : <strong>{props.totalCase}</strong></h4>
              </div>)
}

export default CovidSummary