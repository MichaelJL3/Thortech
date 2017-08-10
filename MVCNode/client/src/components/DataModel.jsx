
/**
 * @file DataModel.jsx
 * @author Michael Laucella
 * @desc class for holding/displaying a data model
 */

import React from "react";

/**
 * @class DataModel
 * @desc houses a data model
 */
export default class DataModelContainer extends React.Component {

    /**
     * @function contructor
     * @desc the constructor
     * @param {Object} props components properties  
     */
    constructor(props) {
        super(props)

        //what if no data??

        const data = props.data || {};
        
        this.state = {
            index: data.index,
            value: data.value
        }
    }

    /**
     * @function shouldComponentUpdate
     * @desc prevent unnecessary reloads of the DOM
     * @param {Object} nextProps the new set of properties for the component 
     * @param {Object} nextstate the new state for the component
     * @return {Boolean} if the component should update
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.index!==this.state.index||nextState.value!==this.state.value)
    }

    /**
     * @function render
     * @desc returns renderable jsx code
     * @return {Component} the component display to render
     */
    render() {
        return (
            <div>
                
            </div>
        )
    }
}