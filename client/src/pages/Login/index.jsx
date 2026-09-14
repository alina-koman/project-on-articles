import React from "react";
import { useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import {fetchAuth} from "../../redux/slices/auth";

export const Login = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
        defaultValues: {
            email: "test@test.ua",
            password: "12345",
        },
        mode: 'onChange',
    })

    const onSubmit = (values) => {
        dispatch(fetchAuth(values))
    }

  return (
    <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Вход в аккаунт
            </Typography>
            <TextField
                className={styles.field}
                label="E-Mail"
                type="email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register("email", { required: 'Вкажіть пошту ' })}
                fullWidth
            />
            <TextField
                className={styles.field}
                label="Пароль"
                type="password"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password", { required: 'Вкажіть пароль ' })}
                fullWidth />
            <Button type="submit" size="large" variant="contained" fullWidth>
                Войти
            </Button>
        </form>
    </Paper>
  );
};
