const express = require("express");
const userContoller = require("../controllers/authController");

const router = express.Router();

router.post("/signUp", userContoller.signUp);
/**
   * @api {post} /auth/signUp signUp user
   * @apiName signUp user
  
   * @apiDescription signUp user
   *
   * @apiBodyExample {json} :
   * 
   *
   {
        "email": "harman@gmailcom",
        "userName":"harman",
        "password": "harman",
        "firstName": "harman",
        "lastName": "bagga",
       
   }
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *
   {
       "code": 200,
       "message": "Regisration success",
       
   }
   */
router.post("/login", userContoller.logIn);

/**
   * @api {post} /auth/login login user
   * @apiName login user
  
   * @apiDescription Login user
   *
    * @apiBodyExample {json} :
   * 
   *
   {
        "email": "harman@gmailcom",
        "password": "harman",
    
       
   }
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *
   {
       "code": 200,
       "message": "Login success",
       "token": "token",
       "user":"ABC",
       "color":"#000"
   }
   */

module.exports = router;
