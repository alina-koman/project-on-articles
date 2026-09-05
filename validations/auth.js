import { body } from "express-validator"

export const  registerValidation = [
    body("email", "Невірний формат пошти").isEmail(),
    body("password", "Пароль повинен бути не менше 5 символів").isLength({min: 5}),
    body("fullName", "Вкажіть своє ім'я").isLength({min: 3}),
    body("avatarUrl", "Невірна силка на аватар").optional().isURL()
]