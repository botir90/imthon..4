const { v4 } = require("uuid")
const { read_file, write_file } = require("../api/file-system")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register =  async (req , res ) => {
  try{
    const {username,email,password} = req.body

const users = read_file("register.json")
const foundeduser = users.find((itme) => itme.email===email)

if (foundeduser) {
  return res.status(400).json({
    message : "user alredy exist"
  })
}
const hash = await bcrypt.hash(password,12)

const newuser = {
  id: v4(),
  username ,
  email,
  password :hash,
  role : "user"
}
users.push(newuser)
write_file("register.json", users)
res.status(200).json({
  message : "registered",
  user : newuser
})

  } catch (error) {
    res.status(500).json({
      message :error.message
    })
  }
}

const login = async   (req , res )=>{
  try{
    const {email,password} = req.body

const users = read_file("register.json")
const foundeduser = users.find((itme) => itme.email===email)

if (!foundeduser) {
  return res.status(400).json({
    message : "user not found"
  })
}
const decode = await bcrypt.compare(password, foundeduser.password)
if (decode) {
  const token = jwt.sign(
    {role:foundeduser.role , email,email:foundeduser.email , id:foundeduser.id},
    process.env.SEKRET,
    {
      expiresIn :"7d"
    }
  )
  res.status(200).json({
  message : "registered",
  token: token

})
}else {

  return res.status(401).json({
  message : "success",

})
}





  } catch (error) {
    res.status(500).json({
      message :error.message
    })
  }
}

module.exports = {
  register,
  login
}