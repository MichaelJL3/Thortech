
/**
 * @file api.js
 * @author Michael Laucella
 * @desc defines the api routes and logic
 */

const nodeCache = require('node-cache')
const cache = new nodeCache()
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
 * @name /
 * @method GET
 * @desc redirect to /displayRelational
 */
router.get('/', function(req, res, next) {
  res.redirect('/displayRelational')
})

/**
 * @name /displayRelational
 * @method GET
 * @desc gather all the data from the master and detail tables
 * and form them into a relational model for display
 */
router.get('/displayRelational', function(req, res, next){
  //check if value is cached
  const masterCached = cache.get("R_ALL")
  if(masterCached) return send(masterCached, res)

  conn.queryAsync("CALL DisplayMaster()")
    .then(results=>{
      const master = {}
      
      //add every master to the masters object
      results[0].forEach(result=>{
        master[result.ID]=(new MasterModel(result.ID, result.value))
      })
      
      conn.queryAsync("CALL DisplayDetail()")
        .then(results=>{
          
          //assign each child to appropriate master
          results[0].forEach(result=>{
            const child = new DataModel(result.ID, result.value)
            const parent = result.masterID;
            if(parent>=0&&master[parent])
              master[parent].addChild(child)
          })
          
          send(master, res)
          //set cache
          cache.set("R_ALL", master)
        })
    })
    .catch(err=>next(client(err)))
})

/**
 * @name /displayRelational/:id
 * @method GET
 * @desc get a relational model of master and children by master id
 */
router.get('/displayRelational/:id', hasID, function(req, res, next){
  const id = req.params.id
  
  //check if value is cached
  const masterCached = cache.get(id)
  if(masterCached) return send(masterCached, res)

  conn.queryAsync("CALL DisplayMasterByID("+id+")")
    .then(results=>{
      const result = results[0][0]
      const master = {}
      master[result.ID] = new MasterModel(result.ID, result.value)
      
      //get children of the master ID
      conn.queryAsync("CALL ChildrenOf("+id+")")
        .then(results=>{
          //add the children to the master object
          results[0].forEach(result=>{
            const child = new DataModel(result.ID, result.value)
            const parent = result.masterID;
            if(parent!==undefined&&parent===+id)
              master.addChild(child)
          })
          
          send(master, res)
          //set cache
          cache.set(id, master)
        })
    })
    .catch(err=>next(client(err)))
})

/**
 * @name /displayData
 * @method GET
 * @desc display all data from master and detail 
 * in a relational join
 */
router.get('/displayData', function(req, res, next){
  conn.queryAsync("CALL DisplayData()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * @name /detailSize
 * @method GET
 * @desc get the size of the detail table
 */
router.get('/detailSize', function(req, res, next){
  conn.queryAsync("CALL DetailSize()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * @name masterSize
 * @method GET
 * @desc get the size of the master table
 */
router.get('/masterSize', function(req, res, next){
  conn.queryAsync("CALL MasterSize()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * @name /displayDetail
 * @method GET
 * @desc display all the data in the detail table
 */
router.get('/displayDetail', function(req, res, next){
  conn.queryAsync("CALL DisplayDetail()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * @name /displayDetail/:id
 * @method GET
 * @desc display a single item from the detail table
 */
router.get('/displayDetail/:id', hasID, function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL DisplayDetailByID("+id+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * @name /displayMaster
 * @method GET
 * @desc display all the data in the master table
 */
router.get('/displayMaster', function(req, res, next){
  conn.queryAsync("CALL DisplayMaster()")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * @name /displayMaster/:id
 * @method GET
 * @desc display a single item from the master table
 */
router.get('/displayMaster/:id', hasID, function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL DisplayMasterByID("+id+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * @name /display/:type
 * @method GET
 * @desc redirects to a display route based on type
 */
router.get('/display/:type', function(req, res, next){
  const type = req.params.type
  switch(type){
    case "detail": return res.redirect('/displayDetail')
    case "master": return res.redirect('/displayMaster')
    default: return res.redirect('/')
  }
})

/**
 * @name /childrenOf/:id
 * @method GET
 * @desc gets all the children of the associated ID
 */
router.get('/childrenOf/:id', hasID, function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL ChildrenOf("+id+")")
    .then(results=>send(results[0], res))
    .catch(err=>next(client(err)))
})

/**
 * @name /sibllingOf/:id
 * @method GET
 * @desc finds its own parent then redirects to get children
 * of said parent, returned listing will include self
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
 * @name /insertDetail
 * @method POST
 * @desc insert a new detail entry into the DB
 */
router.post('/insertDetail', function(req, res, next){
  const parent = req.body.parent
  const value = req.body.value
  conn.queryAsync("CALL InsertMaster("+parent+" "+value+")")
    .then(results=>{
      send(results, res, 201)
      //reset the cached relations there has been a change
      cache.del("R_ALL")
    })
    .catch(err=>next(client(err)))
})

/**
 * @name /insertMaster
 * @method POST
 * @desc insert a new master entry into the DB
 */
router.post('/insertMaster', function(req, res, next){
  const value = req.body.value
  conn.queryAsync("CALL InsertDetail("+value+")")
    .then(results=>{
      send(results[0], res)
      //reset the cached relations there has been a change
      cache.del("R_ALL")
    })
    .catch(err=>next(client(err)))
})

/**
 * @name /updateMaster
 * @method PUT
 * @desc updates a record in the master DB
 */
router.put('/updateMaster', hasID, hasValue, function(req, res, next){
  const id = req.body.id
  const value = req.body.value
  conn.queryAsync("CALL UpdateMaster("+id+" "+value+")")
    .then(results=>{
      send(results[0], res)
      //reset the cached relations there has been a change
      cache.del("R_ALL")
    })
    .catch(err=>next(client(err)))
})

/**
 * @name /updateDetail
 * @method PUT
 * @desc updates a record in the detail DB
 */
router.put('/updateDetail', hasID, hasValue, function(req, res, next){
  const id = req.body.id
  const value = req.body.value
  conn.queryAsync("CALL UpdateDetail("+id+" "+value+")")
    .then(results=>{
      send(results[0], res)
      //reset the cached relations there has been a change
      cache.del("R_ALL")
    })
    .catch(err=>next(client(err)))
})

/**
 * @name /updateDetailParent
 * @method PUT
 * @desc updates the parent of a detail as long as parent is valid
 */
router.put('/updateDetailParent', hasID, hasValue, hasParent, function(req, res, next){
  const id = req.body.id
  const parent = req.body.parent
  const value = req.body.value
  conn.queryAsync("CALL UpdateDetailParent("+id+" "+parent+" "+value+")")
    .then(results=>{
      send(results[0], res)
      //reset the cached relations there has been a change
      cache.del("R_ALL")
    })
    .catch(err=>next(client(err)))
})

/**
 * @name /deleteMaster/:id
 * @method DELETE
 * @desc delete an entry from the master DB
 */
router.delete('/deleteMaster/:id', function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL DeleteMasterByID("+id+")")
    .then(results=>{
      send(results[0], res)
      //reset the cached relations there has been a change
      cache.del("R_ALL")
    })
    .catch(err=>next(client(err)))
})

/**
 * @name /deleteDetail/:id
 * @method DELETE
 * @desc delete an entry from the detail DB
 */
router.delete('/deleteDetail/:id', function(req, res, next){
  const id = req.params.id
  conn.queryAsync("CALL DeleteDetailByID("+id+")")
    .then(results=>{
      send(results[0], res)
      //reset the cached relations there has been a change
      cache.del("R_ALL")
    })
    .catch(err=>next(client(err)))
})

module.exports = router
