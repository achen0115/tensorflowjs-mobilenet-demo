import React, {Component} from 'react';
import './App.css';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {Container, Progress} from 'semantic-ui-react';

import Dz from './Dz';

class App extends Component {
  imgRef = React.createRef();

  model = null;

  state = {
    disable: true,
    predicitons: null,
  };

  componentDidMount() {
    mobilenet.load().then(model => {
      this.model = model;
      this.setState({disable: false});
    });
  }

  render() {
    return (
      <Container>
        <Dz
          ref={this.imgRef}
          clear={this.handleClearPredictions}
          classify={this.handleClassify}
        />
        {!!this.state.predictions &&
          this.state.predictions.map(({className, probability}) => (
            <Progress percent={Math.round(probability * 100)} success>
              {className}
            </Progress>
          ))}
        <div>
          <pre>{JSON.stringify(this.state.predictions, null, 2)}</pre>
        </div>
      </Container>
    );
  }

  handleClearPredictions = () => {
    this.setState({predictions: null});
  };

  handleClassify = () => {
    this.setState({predictions: null});
    this.model.classify(this.imgRef.current).then(predictions => {
      console.log(predictions);
      this.setState({predictions});
    });
  };
}

export default App;
