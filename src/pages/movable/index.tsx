import Taro, { Component } from '@tarojs/taro'
// 引入 MovableArea, MovableView 组件
import { MovableArea, MovableView, View } from '@tarojs/components'

import './index.scss'

class Movable extends Component {

  state = {
    list: [{
      name: "1",
      top: 0
    }, {
      name: "2",
      top: 60
    }, {
      name: "3",
      top: 120
    }],
    startMove: false,
    movableViewPosition: {
      x: 0,
      y: 0
    },
    selectedItem: {
      index: -1,
      positionY: 0,
    },
    selectedContent: {},
  }

  getMoveItem = (y) => {
    let offY = 0
    let { list } = this.state
    for (let i = 0; i < list.length; i++) {
      if (y >= offY && y < offY + 60) {
        return {
          index: i,
          startY: offY,
          nowY: y
        }
      }
      offY += 60
    }
    return {
      index: -1,
      startY: 0,
      nowY: 0
    }
  }

  touchStart = (e) => {
    let start = this.getMoveItem(e.changedTouches[0].clientY)
    console.log('start', start)

    if (start.index > -1) {
      e.stopPropagation()

      this.setState({
        startMove: true,
        movableViewPosition: {
          x: 0,
          y: start.startY
        },
        selectedItem: {
          index: start.index,
          positionY: start.startY
        },
        selectedContent: this.state.list[start.index],
      })
    }
  }

  updateStatus = false

  touchMove = (e) => {
    if(this.state.selectedItem.index === -1) {
      return
    }

    let { index, positionY } = this.state.selectedItem
    let { list } = this.state

    e.stopPropagation()

    let moveDistance = e.changedTouches[0].clientY - positionY
    console.log('moveDistance', moveDistance)

    this.setState({
      movableViewPosition: {
        x: 0,
        y: e.changedTouches[0].clientY
      }
    })

    if (moveDistance > 0 && index < this.state.list.length - 1 && !this.updateStatus) {
      if (moveDistance >= 60) {
        this.updateStatus = true

        list.splice(index, 1)
        list.splice(++index, 0, this.state.selectedContent)

        positionY += 60;

        this.setState({
          list: list,
          selectedItem: {
            index: index,
            positionY: positionY
          }
        }, () => {
          this.updateStatus = false
        })
      }
    }

    if (moveDistance < 0 && index > 0 && !this.updateStatus) {
      if (moveDistance < -60) {
        this.updateStatus = true

        list.splice(index, 1)
        list.splice(--index, 0, this.state.selectedContent)

        positionY -= 60;

        this.setState({
          list: list,
          selectedItem: {
            index: index,
            positionY: positionY
          }
        }, () => {
          this.updateStatus = false
        })
      }
    }
  }

  touchEnd = (e) => {
    console.log('touchEnd', 'touchEnd')

    this.setState({
      startMove: false,
      movableViewPosition: {
        x: 0,
        y: 0,
      },
      selectedItem: {
        index: -1,
        positionY: 0
      },
      selectedContent: {},
    })
  }


  render() {
    return (
      <View style='height: 300px; width: 100%; background: green;'
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
      >
        {
          this.state.startMove && (
            <MovableArea style={{ position: 'absolute', height: '300px' }}>
              <MovableView y={this.state.movableViewPosition.y} direction="vertical">
                <View style={{ height: '50px', width: '100px', background: 'yellow' }}>
                  {this.state.selectedContent.name}
                </View>
              </MovableView>
            </MovableArea>
          )
        }
        {
          this.state.list.map((it, index) => {
            return (
              <View style={{ marginTop: index ? '10px' : 0, height: '50px', width: '100px', background: 'yellow' }}>
                {it.name}
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default Movable
