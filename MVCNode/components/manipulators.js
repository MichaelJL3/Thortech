
/**
 * @file manipulators.js
 * @author Michael Laucella
 * @desc modifies/formats data elements for return
 */

 /**
 * @name client
 * @desc modifies an errors status as client
 * @param {Object} err the error object to modify 
 */
exports.client = (err) => {
  err.status=400
  return err
}

/**
 * @name send
 * @desc takes in data and returns it to the client
 * @param {Any} data any value to be returned as data to the client 
 * @param {Object} res the result object to initiate the data transfer
 * @param {Integer} status the HTTP status associated with the data sent
 */
exports.send = (data, res, status) => {
  res.locals.data=data
  res.status(status||200).json(res.locals)
}