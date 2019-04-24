import Taro, { Component, Config } from '@tarojs/taro'
import { View, Map } from "@tarojs/components"

import './index.scss'

var amapFile = require('../../libs/amap/amap-wx.js')
var myAmapFun = new amapFile.AMapWX({ key: '8d4b5ef1c666301c6bf92a9a624fda43' })

type PageState = {
  markers: any[]
  polyline: any[]
}
interface MapDemo {
  state: PageState
}

class MapDemo extends Component {
  config: Config = {
    navigationBarTitleText: 'Map Spike'
  }

  constructor(props) {
    super(props)

    this.state = {
      markers: [{
        longitude: 113.324520,
        latitude: 23.099994,
        iconPath: 'https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_2-512.png',
        width: 40,
        height: 40,
      },{
        longitude: 113.327420,
        latitude: 23.099999,
        iconPath: 'https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_2-512.png',
        width: 40,
        height: 40,
      },{
        longitude: 113.327420,
        latitude: 23.104009,
        iconPath: 'https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_2-512.png',
        width: 40,
        height: 40,
      }],
      polyline: []
    }
  }

  componentDidMount() {
    // Taro.openLocation({
    //   latitude: 23.104009,
    //   longitude: 113.327420,
    //   scale: 18
    // })

    myAmapFun.getDrivingRoute({
      origin: '113.324520,23.099994',
      destination: '113.327420,23.104009',
      waypoints: '113.327420,23.099999',
      success: (data) => {
        var points:{longitude: any, latitude: any}[] = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        this.setState({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        })
      },
      fail: (info) => {

      }
    })
  }

  render() {
    return (
      <View className="container">
        <Map
          longitude={113.324520}
          latitude={23.099994}
          markers={this.state.markers}
          polyline={this.state.polyline}
        >
        </Map>
      </View>
    )
  }
}

export default MapDemo