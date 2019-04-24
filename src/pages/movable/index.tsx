import Taro, { Component } from '@tarojs/taro'
// 引入 MovableArea, MovableView 组件
import { MovableArea, MovableView } from '@tarojs/components'

import './index.scss'
import Container from "./container";

class Movable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          name: "1",
          top: 0
        },
        {
          name: "2",
          top: 60
        },
        {
          name: "3",
          top: 120
        }
      ]
    };
  }


  render () {
    return (
      <MovableArea style='height: 200px; width: 100%; background: green;'>
        {
          this.state.list.map(it => {
            return (
              <MovableView style={{top: it.top+'px', height: '50px', width: '80%', background: 'blue'}} direction='vertical'>
                <Container name={it.name}></Container>
              </MovableView>
            )
          })
        }
      </MovableArea>
    )
  }
}

export default Movable
