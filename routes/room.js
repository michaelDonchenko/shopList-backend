const express = require('express')
const {
  createRoom,
  login,
  getRoom,
  addToCurrentList,
} = require('../controllers/room')
const { isAuth } = require('../middleware/isAuth')
const router = express.Router()

router.post('/register', createRoom)
router.post('/login', login)
router.get('/', isAuth, getRoom)
router.put('/currentList', isAuth, addToCurrentList)

module.exports = router
