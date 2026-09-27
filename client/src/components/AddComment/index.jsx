import React from "react";
import { useSelector } from "react-redux";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "../../axios";

export const Index = ({ postId, onCommentCreated }) => {
  const user = useSelector((state) => state.auth.data);
  const [text, setText] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const commentText = text.trim();
    if (!commentText || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const { data } = await axios.post(`/posts/${postId}/comments`, {
        text: commentText,
      });
      setText("");
      onCommentCreated(data);
    } catch (requestError) {
      console.warn(requestError);
      setError(
        requestError.response?.data?.message || "Не вдалося додати коментар."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Typography sx={{ p: 2 }} color="text.secondary">
        Увійдіть, щоб залишити коментар.
      </Typography>
    );
  }

  return (
      <form className={styles.root} onSubmit={onSubmit}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={user.avatarUrl}
          alt={user.fullName}
        />
        <div className={styles.form}>
          <TextField
            label="Напишіть коментар"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(event) => setText(event.target.value)}
            inputProps={{ maxLength: 2000 }}
            error={Boolean(error)}
            helperText={error || `${text.length}/2000`}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!text.trim() || isSubmitting}
          >
            {isSubmitting ? "Надсилання..." : "Надіслати"}
          </Button>
        </div>
      </form>
  );
};
