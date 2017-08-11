
/**
 * @file View.jsx
 * @author Michael Laucella
 * @desc the view component 
 */

import React from 'react';
import Request from './Request.js';
import DataModelContainer from './DataModelContainer.jsx';
import AlertBox from './Alerts.jsx';

import "../stylesheets/Views.css";

import {
    Accordion,
    Pagination
} from 'react-bootstrap';

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

        this.limit = 20;
        this.data = []

        this.state = {
            data: [],
            activePage: 1,
            pages: 0
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
        const boolPage = nextState.activePage !== this.state.activePage;
        const boolPages = nextState.pages !== this.state.pages;
        return boolPage||boolPages||!arrayEquals(this.state.data, nextState.data);
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

            this.data = data;
            this.setState({
                data: this.getData(),
                pages: Math.ceil(data.length/this.limit)
            });
        }else if(res.warning){
            this.msg.show(res.message, "warning");
        }else{
            this.msg.show(res.message, "error");
        }
    }

    /**
     * @method getData
     * @desc takes a section of the data block relevant to the users page
     * @param {Integer} p an optional page number, will default to the set active page
     * @return {Array} a sliced portion of the data array
     */
    getData = (p) => {
        const page = p || this.state.activePage;
        const lowerBound = (page-1) * this.limit;
        const upperBound = page * this.limit;
        return this.data.slice(lowerBound, upperBound)
    }

    /**
     * @method handleSelect
     * @desc handles page change state settings
     * @param {Object} e the event object
     */
    handleSelect = (e) => {
        this.setState({ 
            activePage: e,
            data: this.getData(e)
        });
    }

    /**
     * @function render
     * @desc returns renderable jsx code
     * @return {Component} the component display to render
     */
    render() {
        return (
            <div id="appbody">
		        <AlertBox ref={r => this.msg = r}/>

                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.state.pages}
                    maxButtons={5}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect} 
                />

                <Accordion>
                    { this.state.data.map (
                        (dataModelMaster, index) => 
                            <DataModelContainer 
                                key={index} eventKey={index} data={dataModelMaster}
                            />
                    ) }
                </Accordion>

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
