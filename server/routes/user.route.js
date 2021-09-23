import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import express from 'express'

const router = express.Router()


router.route ('/api/users')
    .get (userCtrl.list)
    .post (userCtrl.create)
router.route ('/api/users/:userId')
    .get (authCtrl.requrireSingin, userCtrl.read)
    .put (authCtrl.requrireSingin, authCtrl.hasAthorization , userCtrl.update)
    .delete (authCtrl.requrireSingin, authCtrl.hasAthorization, userCtrl.remove)
router.param ('userId', userCtrl.userByID)


export default router