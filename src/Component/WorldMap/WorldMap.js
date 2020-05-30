import React, {useState, Component} from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapDataAsia from '../../config/mapWorld';


// Load Highcharts modules
require('highcharts/modules/map')(Highcharts);


class WorldMap extends Component {

    state = {
        country:null
    }

    mapOptions = {
        chart: {
          spacingLeft: 1,
          spacingRight: 1
      },
    
      title: {
          text: null
      },
    
      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
    
      colorAxis: {
          minColor: 'rgba(196, 0, 0, 0.1)',
          maxColor: 'rgba(196, 0, 0, 1)'
      },
    
      tooltip: {
          headerFormat: '<b>{point.point.name}</b><br>',
          footerFormat: '<span style="font-size: 10px"></span>'
      },
    
      legend: {
          title: {
              text: 'cases',
              style: {
                  fontWeight: 'normal'
              }
          }
      },
        series: [
          {
            mapData: mapDataAsia,
            name: 'confirmed cases',
            data: this.props.covidData,
            allowPointSelect: true,
            states: {
              select: {
                  color: undefined,
                  borderColor: 'black',
              }
          },
          point: {
            events: {
              click: (function(component) {
                  console.log(component)
                return function() {
                  component.setState({country:this.name})
                };
              })(this)
            }
          },
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.05)',
            cursor: 'pointer'
          }
        ]
      };

render(){
    console.log("country is ",this.state.country)
    return (
        <div>
              <HighchartsReact
               options={this.mapOptions}
               constructorType={'mapChart'}
               highcharts={Highcharts}
             />
        </div>
       
         )
}
}

export default WorldMap