import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors/index.js"

const register = async (req, res, next) => {
	const { name, email, password } = req.body
	if (!name || !email || !password) {
		throw new BadRequestError("Please provide all values")
	}

	const userAlreadyExists = await User.findOne({ email })
	if (userAlreadyExists) {
		throw new BadRequestError("Email already in use")
	}
	// try {
	// 	const user = await User.create(req.body)
	// 	res.status(201).json({ user })
	// } catch (err) {
	// 	next(err) //passes the error to error handler
	// }
	const user = await User.create({ name, email, password })
	const token = user.createJWT()

	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			lastName: user.lastName,
			location: user.location,
			name: user.name,
		},
		token,
		location: user.location,
	})
}

const login = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		throw new BadRequestError("Please provide all values")
	}
	const user = await User.findOne({ email }).select("+password")
	if (!user) {
		throw new UnauthenticatedError("Invalid email address")
	}
	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid password")
	}
	const token = user.createJWT()

	user.password = undefined
	res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
	const { email, name, lastName, location } = req.body
	if (!email || !name || !lastName || !location) {
		throw new BadRequestError("Please provide all values")
	}
	const user = await User.findOne({ _id: req.user.userId })

	user.email = email
	user.name = name
	user.location = location
	user.lastName = lastName

	await user.save()

	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

export { register, login, updateUser }
