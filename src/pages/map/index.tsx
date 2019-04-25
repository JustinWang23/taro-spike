import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Map, CoverView } from "@tarojs/components"

import './index.scss'

var amapFile = require('../../libs/amap/amap-wx.js')
var myAmapFun = new amapFile.AMapWX({ key: '8d4b5ef1c666301c6bf92a9a624fda43' })

type PageState = {
  origin: any
  destination: any
  waypoints: any[]
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
      origin: {
        longitude: 113.324520,
        latitude: 23.099994,
      },
      destination: {
        longitude: 113.327420,
        latitude: 23.104009,
      },
      waypoints: [{
        longitude: 113.327420,
        latitude: 23.099999,
      }],
      markers: [],
      polyline: [],
    }
  }

  componentDidMount() {
    this.getMarkers()
    this.getRoute()
    this.getPOI()
  }

  getMarkers = () => {
    let markers: any[] = []
    markers.push({
      ...this.state.origin,
      iconPath: 'https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_2-512.png',
      width: 40,
      height: 40,
    })
    this.state.waypoints.forEach(waypoint => {
      markers.push({
        ...waypoint,
        iconPath: 'https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_2-512.png',
        width: 40,
        height: 40,
      })
    })
    markers.push({
      ...this.state.destination,
      iconPath: 'https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_2-512.png',
      width: 40,
      height: 40,
    })
    this.setState({
      markers,
    })
  }

  getRoute = () => {
    myAmapFun.getDrivingRoute({
      origin: `${this.state.origin.longitude},${this.state.origin.latitude}`,
      destination: `${this.state.destination.longitude},${this.state.destination.latitude}`,
      waypoints: '113.327420,23.099999;',
      success: (data) => {
        var points: { longitude: any, latitude: any }[] = [];
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
        console.log(info)
      }
    })
  }

  getPOI = () => {
    myAmapFun.getPoiAround({
      location: `${this.state.destination.longitude},${this.state.destination.latitude}`,
      querytypes: '011100',
      iconPath: 'http://ku.90sjimg.com/element_pic/17/12/21/aae20cd047335454aac914d139acaf9b.jpg',
      // iconPathSelected: 'http://ku.90sjimg.com/element_pic/17/12/21/aae20cd047335454aac914d139acaf9b.jpg',
      success: (data) => {
        console.log(data)
        this.setState({
          markers: [
            ...this.state.markers,
            ...data.markers,
          ]
        })
      },
      fail: (info) => {
        console.log(info)
      }
    })
  }

  startNav = () => {
    Taro.openLocation({
      longitude: this.state.destination.longitude,
      latitude: this.state.destination.latitude,
      scale: 28
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
        />
        <CoverView className="nav-container">
          <Button className="nav-btn" onClick={this.startNav}>开始导航</Button>
        </CoverView>
      </View>
    )
  }
}

export default MapDemo