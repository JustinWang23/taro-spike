import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from "@tarojs/components"

import './index.scss'

class Map extends Component {
  config: Config = {
    navigationBarTitleText: 'Map Spike'
  }

  render() {
    return (
      <View>
        <Text>Map</Text>
      </View>
    )
  }
}

export default Map