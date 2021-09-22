import userCtrl from '../controllers/user.controller'
import express from 'express'

const router = express.Router()

router.route ('/api/users')
    .get (userCtrl.read)
    .post (userCtrl.create)
router.route ('/api/users/:userId')
    .get (userCtrl.read)
    .push (userCtrl.update)
    .delete (userCtrl.remove)
router.param ('userId', userCtrl.userById)

export default router