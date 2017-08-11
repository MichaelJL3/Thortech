
/**
 * @file Alerts.jsx
 * @author Michael Laucella
 * @desc a component for creating alert boxes within
 * a page, must be referenced to call the show function 
 */

import React from 'react';

import {
	Alert,
	Button
} from 'react-bootstrap';

/**
 * @class AlertBox
 * @desc a component for displaying alerts
 */
export default class AlertBox extends React.Component {
	
	/**
     * @function contructor
     * @desc the constructor
     * @param {Object} props components properties  
     */
	constructor(props) {
		super(props);

		this.state = {
			display: false,
			message: "",
			type: "info"
		}
	}

	/**
     * @function shouldComponentUpdate
     * @desc prevent unnecessary reloads of the DOM
     * @param {Object} nextProps the new set of properties for the component 
     * @param {Object} nextstate the new state for the component
     * @return {Boolean} if the component should update
     */
	componentShouldUpdate(nextProps, nextState){
		return this.state.message!==nextState.message || 
			this.state.type!==nextState.type ||
			this.state.display!==nextState.display;
	}

	/**
	 * @method close
	 * @desc closes the alert box
	 */
	close = () => {
		this.setState({
			display: false,
			message: "",
			type: "info"
		});
	}

	/**
	 * @function show
	 * @desc displays the alert box
	 * @param {String} message the alert message
	 * @param {String} type the type/style of the alert 
	 */
	show(message, type) {
		this.setState({
			display: true,
			message: message,
			type: type
		});
	}

	/**
     * @function render
     * @desc returns renderable jsx code
     * @return {Component} the component display to render
     */
	render() {
		return (this.state.display ? (
			<Alert bsStyle={this.state.type} onDismiss={this.close}>
				<h4> {this.state.type} </h4>
				<p> {this.state.message} </p>
				<p>
					<Button bsStyle={this.state.type} onClick={this.close}> Close </Button>
				</p>
			</Alert>
		) : null )
	}
};

