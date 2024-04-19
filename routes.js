import { Router } from 'express'
import { User, Session } from './model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const router = Router()

router.post('/auth/login', async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })

	if (!user) {
		return res.status(401).end()
	}

	const passwordMatch = bcrypt.compareSync(password, user.password)

	if (!passwordMatch) {
		return res.status(401).end()
	}

	const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
	return res.json({ token })
})

router.post('/auth/forgot-password', async (req, res) => {
	const { email } = req.body

	const user = await User.findOne({ email })

	if (!user) {
		return res.status(404).end()
	}

	// create a reset password session that will expire in 1 hour
	const session = await Session.create({ userId: user._id, expiresAt: moment().add(1, 'hour').toDate() })

	// TODO send an email with a link to reset the password
	// link should contain the session ID which will be passed to the reset-password endpoint
	return res.status(204).end()
})

router.post('/auth/reset-password', async (req, res) => {
	const { password, sessionId } = req.body

	const session = await Session.findById(sessionId)
	
	// TODO create a mongo index so that expired sessions are automatically deleted
	if (!session || session.expiresAt < new Date()) {
		return res.status(401).end()
	}
	
	const user = await User.findById(session?.userId)

	if (!session?.userId || !user) {
		return res.status(401).end()
	}

	user.password = bcrypt.hashSync(password, 10)
	await user.save()
	
	// delete the session so it can't be used again
	await Session.findByIdAndDelete(sessionId)

	return res.status(204).end()
})

export default router