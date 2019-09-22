import React, {Component} from 'react';
import  Slider  from 'react-slider-simple';
import axios from 'axios';
import { getSlider } from '../Reducers/omniEatsReducer';
import { connect } from 'react-redux';

const stylinBar = {
  marginBottom: '100px',
  marginRight: '150px',
  marginLeft: '300px',
  textAlign: 'center',
}

const stylinHeader = {
  padding: '1rem',
  backgroundColor: '#33b5e5',
  border: '2px solid #fff',
  color: '#fff',
  textAlign: 'center',
}

class SliderComp extends Component {
  constructor(props){
    super(props);
    this.state = {
      percent: 50,
    }
    this.onChange = this.onChange.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  onChange(percent){
    this.setState({ percent });
    const { sliderMeat } = this.props;
    sliderMeat(percent)
  }

  onDone(percent){

  }

  render() {
    const { percent } = this.state;
    const {onChange, onDone} = this;
    return (
      <div>
      <div style={stylinHeader}>
          <div>Drag Right For MEATS</div>
      </div>

      <div style={stylinBar}>
        <Slider
          defaultValue={50}
          value={percent}
          onChange={onChange}
          onDone={onDone}
          thumbColor="rgb(219, 112, 147)"
          shadowColor="rgb(119, 12, 47)"
          sliderPathColor='green'
          rounded={true}
          />
        </div>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sliderMeat: percent => dispatch(getSlider(percent))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SliderComp);
