import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHander'

const create = async (req, res) =>{
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message : 'successfull sign up!'
        })
    } catch (error) {
        return res.status(400).json({
            message: errorHandler.getErrorMessage(error)
        })
    }

}

const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user){
            return res.status(400).json({
                message: ' User not found !'
            })
        }
        req.profile = user
        next()
    } catch (error) {
        return res.status(400).json({
            message: ' Could not retrieve user !'
        })
    }
}

const read = async (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.status(200).json(req.profile)
}

const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({
            message: errorHandler(error)
        })
    }
}

const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        return res.json(user)
    } catch (error) {
        return res.status(400).json({
            message: errorHandler(error)
        })
    }
}

const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser  = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        return res.json(deletedUser)
    } catch (error) {
        return res.status(400).json({
            message: errorHandler(error)
        })
    }
}
export default {
    create,
    userByID,
    read,
    list,
    remove,
    update
  }