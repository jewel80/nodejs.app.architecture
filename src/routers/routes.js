const express = require('express');
const userRoutes =require('../controllers/userController');

let router = express.Router();

// console.log(router);

router.use('/users', userRoutes);

// export default router;
module.exports=router;