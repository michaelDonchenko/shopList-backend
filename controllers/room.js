const Room = require('../models/room')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.createRoom = async (req, res) => {
  //destructure the details from the req.body
  let { name, password, passwordConfirm } = req.body
  try {
    if (!name || !password || !passwordConfirm)
      return res.status(400).json({ error: 'כל השדות הם שדות חובה' })

    if (password.length < 6)
      return res.status(400).json({ error: 'הסיסמה חייבת להיות לפחות 6 תווים' })

    if (password !== passwordConfirm)
      return res.status(400).json({ error: 'הסיסמאות אינן שוות' })

    const roomExist = await Room.findOne({ name })
    if (roomExist) return res.status(400).json({ error: 'שם החדר כבר קיים' })

    let room = new Room({
      name,
      password,
    })

    //generate salt for password encryption
    const salt = await bcrypt.genSalt(10)
    //encrypt the password before saving to the DB
    room.password = await bcrypt.hash(password, salt)
    //save the room
    await room.save()
    //creating the header for the token
    const payload = {
      room: {
        id: room.id,
      },
    }
    //generating jwt token and send it to the user
    jwt.sign(
      payload,
      process.env.JWT_SECRET /**secret variable */,
      {
        expiresIn: 9999,
      },
      //check for error or send the token
      (err, token) => {
        if (err) {
          res.status(400).json({ error: err.message })
        }
        res.json({ token })
      }
    )
    //catch error
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.login = async (req, res) => {
  const { name, password } = req.body
  try {
    //validation
    if (!name || !password)
      return res.status(400).json({ error: 'כל השדות הם שדות חובה' })

    let room = await Room.findOne({ name })
    if (!room) {
      return res.status(400).json({ error: 'חדר זה אינו קיים' })
    }

    const isMatch = await bcrypt.compare(password, room.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'הסיסמה שגויה' })
    }

    const payload = {
      room: {
        id: room.id,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET /**secret variable */,
      {
        expiresIn: 9999,
      },
      //check for error or send the token
      (err, token) => {
        if (err) {
          res.status(400).json({ error: err.message })
        }
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.room.id).select('-password')

    res.json(room)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.addToCurrentList = async (req, res) => {
  const { name, price } = req.body
  const item = { name, price }

  try {
    const room = await Room.findById(req.room.id).select('-password')
    room.currentList.push(item)

    const updated = await room.save()

    res.status(201).json(updated)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
