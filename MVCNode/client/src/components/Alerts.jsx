
import React from 'react';

import {
  Alert,
  Button
} from 'react-bootstrap';

export default class AlertBox extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      display: false,
      message: "",
      type: "info"
    }
  }

  render() {
    if (this.state.display) {
      return (
        <Alert bsStyle={this.state.type} onDismiss={this.close}>
          <h4> {this.state.type} </h4>
          <p> 
            {this.state.message}
          </p>
          <p>
            <Button bsStyle={this.state.type} onClick={this.close}> Close </Button>
          </p>
        </Alert>
      )
    } else
      return null
  }

  close = () => {
    this.setState({
      display: false,
      message: "",
      type: "info"
    });
  }

  show(message, type) {
    this.setState({
      display: true,
      message: message,
      type: type
    });
  }
};

