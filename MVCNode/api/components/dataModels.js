
/**
 * @file dataModels.js
 * @author Michael Laucella
 * @desc defines data model classes
 */
 
/**
 * @class DataModel
 * @desc holds a basic index, value tuple
 * @param {Integer} index the models index
 * @param {String} value a string value
 */
const DataModel =
class DataModel {
  constructor(index, value){
    this.index = index
    this.value = value
  }
}

exports.DataModel = DataModel

/**
 * @class MasterModel
 * @desc a DataModel that has a referenced list of child models
 * @param {Integer} index the models index
 * @param {String} value a string value
 */
const MasterModel = 
class MasterModel extends DataModel{
  constructor(index, value){
    super(index, value)
    this.children = []
  }

  /**
   * @method addChild
   * @desc appends a new child to the list
   * @param {Object} child a DataModel object 
   */
  addChild(child) {
    this.children.push(child)
  }
}

exports.MasterModel = MasterModel