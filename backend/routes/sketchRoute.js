const express = require("express");
const sketchContoller = require("../controllers/sketchController");
const jwt = require("../middleware/jwt");

const router = express.Router();

router.post("/add", sketchContoller.addSketch);
/**
   * @api {post} /sketch/add 
   * @apiName sketch add
  
   * @apiDescription Add new sketch
   * @apiBodyExample {json} :
   * 
   *
   {
       "sketchData": {},
       "createdBy":"harman",
       "color":"#444"
       
   }
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *
   {
       "code": 200,
       "message": "Sketch success added",
       
   }
   */
router.get("/getById/:id", jwt.jwtVerify, sketchContoller.getById);
/**
   * @api {GET} /sketch/getById/:id 
   * @apiName sketch by Id
  
   * @apiDescription Get sketch by id
   *
   *

   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *
   {
       "code": 200,
       "message": "Sucessfully Retrived",
       
   }
   */
router.get("/getList", jwt.jwtVerify, sketchContoller.getList);
/**
   * @api {POST} /sketch/getList
   * @apiName sketch list
  
   * @apiDescription Get all sketch
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *
   {
       "code": 200,
       "message": "Sucessfully Retrived",
       
   }
   */
router.post("/update/:id", jwt.jwtVerify, sketchContoller.updateSketch);
/**
   * @api {POST} /sketch/update/:id
   * @apiName sketch update 
  
   * @apiDescription Update Sketch Data
   *
    * @apiBodyExample {json} :
   * 
   *
   {
       "sketchData": {},
       "user":"harman",
       "color":"#444"
       
   }

   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *
   {
       "code": 200,
       "message": "Sketch update Sucessfully",
       
   }
   */
module.exports = router;
