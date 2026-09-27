import { body } from "express-validator"

export const  loginValidation = [
    body("email", "Некоректна адреса електронної пошти").isEmail(),
    body("password", "Пароль має містити щонайменше 5 символів").isLength({min: 5})
]

export const  registerValidation = [
    body("email", "Некоректна адреса електронної пошти").isEmail(),
    body("password", "Пароль має містити щонайменше 5 символів").isLength({min: 5}),
    body("fullName", "Вкажіть своє ім'я").isLength({min: 3}),
    body("avatarUrl", "Некоректне посилання на аватар").optional().isURL()
]

export const  postCreateValidation = [
    body("title", "Введіть назву статті").isLength({min: 3}).isString(),
    body("text", "Введіть текст статті").isLength({min: 3}).isString(),
    body("tags", "Некоректний формат тегів")
        .optional()
        .customSanitizer((tags) =>
            typeof tags === "string"
                ? tags.split(",").map((tag) => tag.trim()).filter(Boolean)
                : tags
        )
        .isArray(),
    body("imagesUrl", "Некоректне посилання на зображення").optional().isString()
]