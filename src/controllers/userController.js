const express = require("express");
// const { saveUser, getAllUsers, update, deleteById } = require("../services/userService");
// const validators = require("../models/view-models");
// const { handleValidation } = require("../middlewares/handleValidations");

const router = express.Router();

const getHandler = async (req, res, next) => {
    try {
        // const users = await getAllUsers();
        const users = {
            "name": "jewel",
            'age': 25
        };
        res.status(200).send(users);
    } catch (error) {
        return next(error, req, res);
    }
};

// const postHandler = async (req, res, next) => {
//     try {
//         const body = req.body;
//         const user = await saveUser(body);
//         res.status(201).send(user._id);
//     } catch (error) {
//         return next(error, req, res);
//     }
// };

// const putHandler = async (req, res, next) => {
//     try {
//         const body = req.body;
//         const user = await update(body);
//         res.status(200).send(user._id);
//     } catch (error) {
//         return next(error, req, res);
//     }
// }

// const deleteHandler = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         await deleteById(id);
//         res.status(200).send("User deleted");
//     } catch (error) {
//         return next(error, req, res);
//     }
// }

router.get('/', getHandler);
// router.post('/', handleValidation(validators.userSchemaValidate), postHandler);
// router.put('/', putHandler);
// router.delete('/:id', deleteHandler);

// export default configure;
module.exports= router;