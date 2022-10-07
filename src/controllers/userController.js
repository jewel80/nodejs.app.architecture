const express = require("express");
const { saveUser, getAllUsers, update, deleteById,getUserById, } = require("../services/userService");
const validators = require("../models/request.models");
const { handleValidation } = require("../middlewares");
const { _response } = require("../utils/response");
const router = express.Router();

/**
 * Retrieve all record...
 */
const getHandler = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.getAllSuccess,
            data: { users }
        });
    } catch (error) {
        return next(error, req, res);
    }
};

/**
 * Retrieve record by Id...
 */
const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
        if (user) {
            res.status(200).json({
                createDate: new Date().toUTCString(),
                success: true,
                status: 200,
                message: _response.getAllSuccess,
                data: { user }
            });
        }
        else {
            throw new NotFound('User not found by the id: ' + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

/**
 * Create record...
 */
const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await saveUser(body);
        res.status(201).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 201,
            message: _response.createSuccess,
            data: { user }
        });
    } catch (error) {
        return next(error, req, res);
    }
};

/**
 * updated record  by {id}...
 */
const putHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await update(body);
        res.status(200).send(user._id);
    } catch (error) {
        return next(error, req, res);
    }
}

/**
 * delete record by {id}...
 */
const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteById(id);
        res.status(200).send("User deleted");
    } catch (error) {
        return next(error, req, res);
    }
}


/**
 * All Route path define...
 * ex: {{host:port}}/api/v1/[basic path..]
 */
router.get('/', getHandler);
router.get('/:id', getByIdHandler);
router.post('/', handleValidation(validators.userSchemaValidate), postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);

module.exports = router;