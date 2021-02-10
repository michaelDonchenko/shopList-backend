const express = require('express')
const {
  createRoom,
  login,
  getRoom,
  addToCurrentList,
  deleteFromCurrentList,
  addToFavorites,
  deleteFromFavorites,
  updateCurrentList,
  updateFavorite,
  updateChecked,
  addFromFavorites,
  updateDetails,
} = require('../controllers/room')
const { isAuth } = require('../middleware/isAuth')
const router = express.Router()

router.post('/register', createRoom)
router.post('/login', login)
router.put('/roomDetails', isAuth, updateDetails)
router.get('/', isAuth, getRoom)
router.post('/currentList', isAuth, addToCurrentList)
router.post('/currentList/favorite', isAuth, addFromFavorites)
router.delete('/currentList/:id', isAuth, deleteFromCurrentList)
router.put('/currentList/:id', isAuth, updateCurrentList)
router.put('/currentList/check/:id', isAuth, updateChecked)
router.post('/favorites', isAuth, addToFavorites)
router.delete('/favorites/:id', isAuth, deleteFromFavorites)
router.put('/favorites/:id', isAuth, updateFavorite)

module.exports = router
