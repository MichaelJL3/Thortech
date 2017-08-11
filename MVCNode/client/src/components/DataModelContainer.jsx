
/**
 * @file DataModelContainer.jsx
 * @author Michael Laucella
 * @desc class for holding/displaying data models 
 */

import React from "react";
import DataModel from './DataModel.jsx';

import {
    Panel
} from 'react-bootstrap';

/**
 * @class DataModelContainer
 * @desc houses data models 
 */
const DataModelContainer = ({data}) => (
    <div>
        <Panel bsStyle="success" header={"Parent[" + data.index + "] : "+data.value}>
            { data.children.map(
                (dataModelChild, index) => <DataModel 
                    key={index} data={dataModelChild}
                />
            ) }
        </Panel>
    </div>
)

export default DataModelContainer;
