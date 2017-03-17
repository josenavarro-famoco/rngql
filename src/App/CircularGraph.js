import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ART,
  Dimensions,
} from 'react-native';
import { Card, COLOR, TYPO } from 'react-native-material-design';

const {
  Surface,
  Group,
  Rectangle,
  Shape,
} = ART;

import * as shape from 'd3-shape';

class CircularGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: [],
      margin: 16,
    };
  }

  componentWillMount() {
    const data = [this.props.number, this.props.total - this.props.number];
    const pie = shape.pie().startAngle(-(Math.PI / 2)).endAngle(Math.PI / 2).sort(null)(data);
    const arc = shape.arc()
      .outerRadius(this.props.width / 2)
      .innerRadius((this.props.width - 50)/ 2);

    const pieChart = pie.map((item, index) => arc(item));
    const shapes = [
      <Shape
        key="pie-filled"
        d={pieChart[0]}
        fill={COLOR[`paper${this.props.color}600`].color}
        stroke={COLOR[`paper${this.props.color}700`].color}
        strokeWidth={1}
      />,
      <Shape
        key="pie-empty"
        d={pieChart[1]}
        fill={COLOR.paperGrey300.color}
        stroke={COLOR.paperGrey400.color}
        strokeWidth={1}
      />,
    ];
    this.setState({ shapes })
  }

  render() {
    const { width, height, label, number } = this.props;
    const { shapes, margin } = this.state;
    const x = (this.props.width + margin) / 2;
    const y = (this.props.height + margin) / 2;
    return(
      <Card style={styles.container}>
        <Text style={[TYPO.paperFontHeadline, styles.label]}>{label} ({number})</Text>
        <View style={styles.graphContainer}>
          <View width={width + margin} height={(height / 2) + margin}>
            <Surface width={width + margin} height={(height / 2) + margin}>
              <Group x={x} y={y}>
                {shapes}
              </Group>
            </Surface>
          </View>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  graphContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    paddingTop: 8,
    paddingBottom: 8,
  }
});

CircularGraph.propTypes = {
  number: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
}

CircularGraph.defaultProps = {
  width: 200,
  height: 200,
  label: 'Label',
  color: 'Blue'
}

export default CircularGraph;
