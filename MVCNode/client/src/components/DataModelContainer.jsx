
/**
 * @file DataModelContainer.jsx
 * @author Michael Laucella
 * @desc class for holding/displaying data models 
 */

import React from "react";
import DataModel from './DataModel.jsx';

/**
 * @class DataModelContainer
 * @desc houses data models 
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

        this.state={
            index: data.index,
            value: data.value,
            data: data.children || []
        };
    }

    /**
     * @function shouldComponentUpdate
     * @desc prevent unnecessary reloads of the DOM
     * @param {Object} nextProps the new set of properties for the component 
     * @param {Object} nextstate the new state for the component
     * @return {Boolean} if the component should update
     */
    shouldComponentUpdate(nextProps, nextState) {
        const bool = (nextState.index!==this.state.index||nextState.value!==this.state.value);
        return bool||!arrayEquals(this.state.data, nextState.data);
    }

    /**
     * @function render
     * @desc returns renderable jsx code
     * @return {Component} the component display to render
     */
    render() {
        return (
            <div>
                { this.state.data.map(
                    (dataModelChild, index) => <DataModel key={index} data={dataModelChild}/>
                ) }
            </div>
        )
    }
}

/**
 * @function arrayEquals
 * @desc checks if the two arrays are equal
 * @param {Array} arr1 
 * @param {Array} arr2
 * @return {Boolean} is array 1 equal to array 2 
 */
const arrayEquals = (arr1, arr2) => {
    if(arr1.length!==arr2.length)
        return false;

    for(var i=0; i<arr1.length; ++i){
        if(arr1[i]!==arr2[i])
            return false;
    }

    return true;
}