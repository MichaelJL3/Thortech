
/**
 * @file api.js
 * @author Michael Laucella
 * @desc defines the api routes and logic
 */

const express = require('express')
const router = express.Router()

const conn = require('../sql/connect')

const models = require('../components/dataModels')

const DataModel   = models.DataModel
const MasterModel = models.MasterModel

const midWare = require('../components/middleware')

const hasID     = midWare.hasID
const hasValue  = midWare.hasValue
const hasParent = midWare.hasParent

const modify = require('../components/manipulators')

const client = modify.client
const send   = modify.send

/**
 * 
 */
router.get('/', function(req, res, next) {
  res.redirect('/displayRelational')
})

/**
 * 
 */
router.get('/displayRelational', function(req, res, next){
  conn.queryAsync("CALL DisplayMaster()")
    .then(results=>{
      const master = []
      
      results[0].forEach(res=>{
        master.push(new MasterModel(res.ID, res.value))
      })
      
      conn.queryAsync("CALL DisplayDetail()")
        .then(results=>{
          
          results[0].forEach(res=>{
            const child = new DataModel(res.ID, res.value)
            const parent = res.masterID-1;
            if(parent!==undefined&&parent<master.length&&parent>=0)
              master[parent].addChild(child)
          })
          
          send(master, res)
        })
    })
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.get('/displayData', function(req, res, next){
  conn.queryAsync("CALL DisplayData()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.get('/detailSize', function(req, res, next){
  conn.queryAsync("CALL DetailSize()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.get('/masterSize', function(req, res, next){
  conn.queryAsync("CALL MasterSize()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.get('/displayDetail', function(req, res, next){
  conn.queryAsync("CALL DisplayDetail()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.get('/displayDetail/:id', hasID, function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL DisplayDetailByID("+id+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.get('/displayMaster', function(req, res, next){
  conn.queryAsync("CALL DisplayMaster()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.get('/displayMaster/:id', hasID, function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL DisplayMasterByID("+id+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.get('/childrenOf/:id', hasID, function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL ChildrenOf("+id+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.get('/siblingOf/:id', hasID, function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL DisplayDetailByID("+id+")")
    .then(results=>{
      const result=results[0][0]
      if(result)
        res.redirect('/childrenOf/'+result.masterID)
      else
        send({}, res, 204)
    })
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.post('/insertDetail', function(req, res, next){
  const parent = req.body.parent
  const value = req.body.value
  conn.queryAsync("CALL InsertMaster("+parent+" "+value+")")
    .then(results=>send(results, res, 201))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.post('/insertMaster', function(req, res, next){
  const value = req.body.value
  conn.queryAsync("CALL InsertDetail("+value+")")
    .then(results=>send(results, res, 201))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.put('/updateMaster', hasID, hasValue, function(req, res, next){
  const id = req.body.id
  const value = req.body.value
  conn.queryAsync("CALL UpdateMaster("+id+" "+value+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.put('/updateDetail', hasID, hasValue, function(req, res, next){
  const id = req.body.id
  const value = req.body.value
  conn.queryAsync("CALL UpdateDetail("+id+" "+value+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.put('/updateDetailParent', hasID, hasValue, hasParent, function(req, res, next){
  const id = req.body.id
  const parent = req.body.parent
  const value = req.body.value
  conn.queryAsync("CALL UpdateDetailParent("+id+" "+parent+" "+value+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.delete('/deleteMaster/:id', function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL DeleteMasterByID("+id+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * 
 */
router.delete('/deleteDetail/:id', function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL DeleteDetailByID("+id+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

module.exports = router
