import PostModel from "../models/Post.js"
import CommentModel from "../models/Comment.js"

const serializePost = (post) => {
    const data = post.toObject()
    return {
        ...data,
        imageUrl: data.imageUrl || data.imagesUrl
    }
}

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().select("tags").sort({ createdAt: -1 }).lean().exec()
        const tagsByName = new Map()

        for (const post of posts) {
            for (const value of Array.isArray(post.tags) ? post.tags : []) {
                if (typeof value !== "string") continue

                const tag = value.trim()
                if (!tag) continue

                const normalizedTag = tag.toLocaleLowerCase("uk-UA")
                if (!tagsByName.has(normalizedTag)) {
                    tagsByName.set(normalizedTag, tag)
                }
            }
        }

        const tags = [...tagsByName.values()].sort((first, second) =>
            first.localeCompare(second, "uk-UA")
        )

        res.json(tags)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалося отримати статті'
        })
    }
}

export const getAll = async (req, res) => {
     try {
         const posts = await PostModel.find().populate('user', 'fullName avatarUrl').exec()
         res.json(posts.map(serializePost))
     } catch (error) {
         console.log(error)
         res.status(500).json({
             message: 'Не вдалося отримати статті'
         })
     }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        const doc = await PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after'
            })
            .populate('user', 'fullName avatarUrl')

            if (!doc) {
               return res.status(404).json({
                    message: 'Статтю не знайдено'
                })
            }

            return res.json(serializePost(doc))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалося отримати статтю'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        const doc = await PostModel.findOneAndDelete({ _id:  postId })

        if (!doc) {
            return res.status(404).json({
                message: 'Статтю не знайдено'
            })
        }

        await CommentModel.deleteMany({ post: postId })

        res.json({
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалося видалити статтю'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        const result = await PostModel.updateOne(
            { _id:  postId },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId
            }
        )

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Статтю не знайдено'
            })
        }

        res.json({
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалося оновити статтю'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
     } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалося створити статтю'
        })
    }
 }