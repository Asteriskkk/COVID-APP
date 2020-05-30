import React, {Component} from 'react'
import WorldMap from '../WorldMap/WorldMap'
import mapDataAsia from '../../config/mapWorld';
import DatePicker from "react-datepicker";
import '../CovidReport/CovidReport.css'
import  Spinner  from '../Spinner/Spinner'
import moment from 'moment';
import apiCall from '../../Util/apiService';
import CovidSummary from '../CovidSummary/CovidSummary';

// config comes from environment with dev or prod
import apiConfig from `../../config/config_${process.env.NODE_ENV}`;
import "react-datepicker/dist/react-datepicker.css";

class CovidReport extends Component{
    state = {
        renderChart:false,
        countryName:null,
        covidData:null,
        date:new Date().setDate(new Date().getDate()-5),
        totalCase:0
      }   

      defaultSetState = ()=> {
        this.setState({
            renderChart:true,
            totalCase:0,
            covidData:[]
        })  
        return true
    }

componentDidMount() {
    console.log("component mounting",this.state.date)
       // this.state.date = 1590382687354, converting date into 'YYYY-MM-DD'
    const formatDate = moment.unix(this.state.date/1000,'MM/DD/YYYY').format('YYYY-MM-DD')
    console.log("config",apiConfig)
    const payload = {
        method:"GET",
        url:apiConfig.getReport.URL.replace('<date>',formatDate)
    }
    apiCall(payload)
      .then(
        (result) => {
                const data = []
                mapDataAsia.features.forEach(element=>{
            
                  data.push([element.properties["hc-key"],result[element.properties.name]?Number(result[element.properties.name]):0])
                })
                this.setState({
                                renderChart:true,
                                covidData:JSON.parse(JSON.stringify(data)),
                                totalCase:result.World
                            })
        }
      )
      .catch(err=>{
        this.defaultSetState()
      })

  }

componentDidUpdate(){
    console.log("component updating",this.state.date)
    if(!this.state.renderChart){
        
        //console.log("state changed",this.state.date)
        // this.state.date = Fri May 22 2020 10:29:31 GMT+0530 (India Standard Time), converting date into 'YYYY-MM-DD'
        const formatDate = moment(this.state.date,'MM/DD/YYYY').format('YYYY-MM-DD')
        const payload = {
            method:"GET",
            url:apiConfig.getReport.URL.replace('<date>',formatDate)
        }
        apiCall(payload)
          .then(
            (result) => {
               // console.log(result,"Res")
             
                    const data = []
                    mapDataAsia.features.forEach(element=>{
                      data.push([element.properties["hc-key"],result[element.properties.name]?Number(result[element.properties.name]):0])
                    })
                    this.setState({
                                    renderChart:true,
                                    covidData:JSON.parse(JSON.stringify(data)),
                                    totalCase:result.World
                                })
            }
          )
          .catch(err=>{
             //console.log("came to catch block")
            this.defaultSetState()
          })
    
    }
}
 


 
    render() {
          return (
              <React.Fragment>
                  <CovidSummary totalCase={this.state.totalCase} />
                <div className="centered">
                    <p>select date&nbsp;:&nbsp;</p>
                  <DatePicker  selected={this.state.date} onChange={date => this.setState({date:date,renderChart:false})} />
                  </div>
                  {this.state.renderChart?
                  <div> 
                      <WorldMap covidData={this.state.covidData}/>
                 </div>
                  :  <Spinner />
                  }
              </React.Fragment>   
          )
    }
}

export default CovidReport
