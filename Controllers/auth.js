const LoginSchema = require('../model/loginSchema')
const logger = require('../Log/logFiles')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {

	try {
		const existEmail = await LoginSchema.findOne({ email: req.body.email })

		if (existEmail)
			return res.status(401).send('This EMAIL is Registered!')
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(req.body.password, salt)

		const user = await new LoginSchema({
			email: req.body.email,
			password: hashedPassword
		})

		// const token = jwt.sign({
		//     user_id:user._id,email},
		//     'JohnWick',{expiresIn:84000},user.token = token,res.status(201).send('---'))

		const saveUser = await user.save()
		res.send(saveUser)
	} catch (err) {
		// res.status(400).send(err)
		res.status(400).send(err)
	}
}

const loginUser = async (req, res) => {

	try {
		if (!req.body.email) return res.status(400).send('No Email Found!')

		const emailExits = await LoginSchema.findOne({ email: req.body.email })
		if (!emailExits)
			return res.status(400).send('This EMAIL is not Registered!')

		const validPass = await bcrypt.compare(req.body.password, emailExits.password)
		if (!validPass) return res.status(400).send('Wrong Password')

		logger.info(res.send("Logged IN!"))

	} catch (err) {
		res.status(400).send(err)
	}

}

module.exports = { registerUser, loginUser }