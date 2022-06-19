const express = require('express');
const router = express.Router();
const accountController = require('../controllers/bankControllers')

//CREATE NEW ACCOUNT
router.post('/newAccount' , accountController.createAccount)

//DEPOSIT MONEY
router.post('/bank/:accNo/deposit', accountController.depositAmount)

//WITHDRAW MONEY
router.post('/bank/:accNo/withdraw' , accountController.withDrawAmount)

//TRANSFER MONEY
router.post('/bank/transfer' , accountController.transferAmount)

//CHECK BALANCE
router.post('/bank/checkBalance' , accountController.checkBalance)

module.exports = router;
