import React, {Component, Fragment} from 'react';
import  Slider  from 'react-slider-simple';
import axios from 'axios';
import { getSlider } from '../Reducers/omniEatsReducer';
import { connect } from 'react-redux';
import { MDBBtn, MDBIcon, MDBAnimation } from "mdbreact";

const stylinBar = {
  marginBottom: '15px',
  marginRight: '250px',
  marginLeft: '250px',
  align: 'center',
  padding: '0.2rem'
}

const stylinHeader = {
  padding: '0.5rem',
  backgroundColor: '#504d54',
  textAlign: 'center',
}

class SliderComp extends Component {
  constructor(props){
    super(props);
    this.state = {
      percent: 50,
    }
    this.onChange = this.onChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  onChange(percent){
    this.setState({ percent });
  }

  onDone(percent){
    const { sliderMeat } = this.props;
    sliderMeat(percent)
  }

  onReset(){
    this.setState({ percent: 50});
    const { sliderMeat } = this.props;
    sliderMeat(50);
  }

  render() {
    const { percent } = this.state;
    const {onChange, onReset, onDone} = this;
    return (
      <div>
      <div style={stylinHeader}>
          <div>
            <Fragment>
              <MDBBtn tag="a" size="sm" color="red" onClick={onReset}>
                RESET
              </MDBBtn>
            </Fragment>
          </div>
      </div>
      <div style={stylinBar}>
      <MDBAnimation type="pulse" count="2">
        <span className="left" style={{float: 'left', marginLeft: '-20px'}}><MDBIcon icon="carrot" style={{align: 'left', color: 'orange'}}/></span>
        <span className="right" style={{float: 'right', marginRight: '-20px'}}><MDBIcon icon="drumstick-bite" style={{align: 'right', color: 'brown'}}/></span>
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
        </MDBAnimation>
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
