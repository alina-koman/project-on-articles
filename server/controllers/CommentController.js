import CommentModel from "../models/Comment.js"
import PostModel from "../models/Post.js"

const commentUserFields = "fullName avatarUrl"

export const getAll = async (req, res) => {
    try {
        const comments = await CommentModel.find()
            .sort({ createdAt: -1 })
            .populate("user", commentUserFields)
            .populate("post", "title")
            .exec()

        res.json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалося отримати коментарі"
        })
    }
}

export const getForPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id).select("_id").exec()

        if (!post) {
            return res.status(404).json({
                message: "Статтю не знайдено"
            })
        }

        const comments = await CommentModel.find({ post: post._id })
            .sort({ createdAt: -1 })
            .populate("user", commentUserFields)
            .exec()

        res.json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалося отримати коментарі"
        })
    }
}

export const create = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id).select("_id").exec()

        if (!post) {
            return res.status(404).json({
                message: "Статтю не знайдено"
            })
        }

        const comment = await CommentModel.create({
            text: req.body.text,
            user: req.userId,
            post: post._id
        })

        await comment.populate("user", commentUserFields)

        res.status(201).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалося додати коментар"
        })
    }
}
