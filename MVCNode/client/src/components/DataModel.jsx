
/**
 * @file DataModel.jsx
 * @author Michael Laucella
 * @desc class for holding/displaying a data model
 */

import React from "react";

import {
    Alert
} from 'react-bootstrap';

/**
 * @class DataModel
 * @desc houses a data model
 */
const DataModel = ({data}) => (
    <Alert bsStyle="info">
        { "Child[" + data.index + "] : " + data.value }
    </Alert>
)

export default DataModel;