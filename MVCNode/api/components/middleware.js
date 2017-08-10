
/**
 * @file middleware.js
 * @author Michael Laucella
 * @desc middleware functions for checking data types/existence
 */

 /**
 * @name hasID
 * @desc checks if request contains an ID
 * and if it is of type Integer
 */
exports.hasID = (req, res, next) => {
  const id=+req.params.id||req.body.id
  if(!id||typeof(id)!=='number'){
    const err = new Error("Invalid ID")
    next(client(err))
  }
  
  next()
}

/**
 * @name hasValue
 * @desc checks if the request contains a value
 * and if it is of type String
 */
exports.hasValue = (req, res, next) => {
  const value=req.params.value||req.body.value
  if(!value||typeof(value)!=='string'){
    const err = new Error("Invalid Value")
    next(client(err))
  }

  next()
}

/**
 * @name hasParent
 * @desc checks if the request contains a parent
 * and if it is of type Integer
 */
exports.hasParent = (req, res, next) => {
  const parent=+req.params.parent||req.body.parent
  if(!parent||typeof(parent)!=='number'){
    const err = new Error("Invalid Parent")
    next(client(err))
  }

  next()
}

/**
 * @name client
 * @desc modifies the error to give it a client error status
 * @param {Object} err an error to modify 
 */
const client = (err) => {
  err.status=400
  return err
}