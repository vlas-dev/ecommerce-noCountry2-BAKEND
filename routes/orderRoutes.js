const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validarCampos");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { authorizeRoles } = require("../helpers/dbValidators");
const { createOrder, getOrders, getOrder, editOrder, deleteOrder } = require("../controllers/orderController");
const router = Router()

router.post('/crear',
isAuthenticated,
authorizeRoles("ADMIN_ROLE"),
validarCampos,
createOrder)

router.get('/',
getOrders)

router.get('/:id',
getOrder)

router.put('/:id',
isAuthenticated,
authorizeRoles("ADMIN_ROLE"),
validarCampos,
editOrder)

router.delete('/:id',
isAuthenticated,
authorizeRoles("ADMIN_ROLE"),
validarCampos,
deleteOrder)



module.exports = router;