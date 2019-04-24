
import Taro, { Component } from '@tarojs/taro'
import {View} from "@tarojs/components";

class Container extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return <View>
      {this.props.name}
    </View>
  }
}

export default Container


