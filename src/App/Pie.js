import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ART,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const {
  Surface,
  Group,
  Rectangle,
  Shape,
} = ART;

import * as shape from 'd3-shape';

class Pie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pieChart: [],
    }
  }

  componentWillMount() {
    console.log(this.props.data)
    // const pieChart = Object.keys(this.props.data).map((key, index) => {
    //   console.log(key, this.props.data[key])
    //   return (
    //     shape.arc({
    //       innerRadius: 30,
    //       outerRadious: this.props.width / 2,
    //       padAngle: .05
    //     })(this.props.data[key])
    //   );
    // })
    const data = Object.keys(this.props.data).map((key) => Object.assign({}, { name: key, value: this.props.data[key] }) )
    // console.log(data)
    const pie = shape.pie().value((d) => d.value).startAngle(-(Math.PI / 2)).endAngle(Math.PI / 2)(data)
    // console.log(pie)
    const arc = shape.arc()
      .outerRadius(this.props.width / 2)
      .innerRadius((this.props.width - 50)/ 2);

    const pieChart = pie.map((item, index) => arc(item))
    // console.log(pieChart)
    // const shapes = pieChart.map((item, index) =>
    //   <Shape
    //     key={`pie-${index}`}
    //     d={item}
    //     stroke="#010101"
    //     strokeWidth={3}
    //   />
    // )
    // console.log(shapes)
    this.setState({ pieChart })
  }

  render() {
    const margin = 16;
    const x = (this.props.width + 8) / 2;
    const y = (this.props.height + 8) / 2;
    console.log(margin, x, y)
    const { pieChart } = this.state;
    console.log(pieChart)
    return(
      <View style={styles.container} width={this.props.width + 16} height={(this.props.height / 2) + 16}>
        <Surface width={this.props.width + 8} height={(this.props.height / 2) + 8}>
          <Group x={x} y={y}>
            {pieChart.map((item, index) =>
              <Shape
                key={`pie-${index}`}
                d={item}
                stroke={"#2ca02c"}
                strokeWidth={1}
              />
            )}
          </Group>
        </Surface>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderColor: 'green',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center'
  }
});

Pie.defaultProps = {
  width: 200,
  height: 200,
}

export default Pie;
