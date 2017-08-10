
/**
 * @file View.jsx
 * @author Michael Laucella
 * @desc the view component 
 */

import React from 'react';
import Request from './Request.js';
import DataModelContainer from './DataModelContainer.jsx';

/**
 * @class View
 * @desc component for the view 
 */
export default class View extends React.Component {

    /**
     * @function contructor
     * @desc the constructor
     * @param {Object} props components properties  
     */
    constructor(props){
        super(props);

        this.id = props.match&&props.match.params&&props.match.params.id;
        this.url = "/displayRelational"+(this.id?"/"+this.id:"");

        this.state = {
            data: []
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
        return !arrayEquals(this.state.data, nextState.data);
    }

    /**
     * @function componentWillMount
     * @desc sends data request if the component is going to mount
     */
    componentWillMount() {
        Request.GET(this.url).then(this.dataLoadComplete);
    }

    /**
     * @method dataLoadComplete
     * @desc handle the return from the data load request
     * @param {Object} res the result object from the api call
     */
    dataLoadComplete = (res) => {
        if(res.success){
            const data = Object.keys(res.data).map((key)=>{
                return res.data[key];
            });
            this.setState({data: data});
        }else if(res.warning){
            //what about warnings ??
            console.log(res.message);
        }else{
            //what about errors ??
            console.log(res.message);
        }
    }

    /**
     * @function render
     * @desc returns renderable jsx code
     * @return {Component} the component display to render
     */
    render() {
        return (
            <div>
                { this.state.data.map (
                    (dataModelMaster, index) => 
                        <DataModelContainer key={index} data={dataModelMaster}/>
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