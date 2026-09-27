import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Post } from "../components/Post";
import { fetchPost } from "../redux/slices/post";

export const TagPosts = () => {
  const { tag = "" } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const matchingPosts = useMemo(() => {
    const normalizedTag = tag.toLocaleLowerCase("uk-UA");

    return posts.items
      .filter((post) =>
        Array.isArray(post.tags) &&
        post.tags.some(
          (postTag) =>
            typeof postTag === "string" &&
            postTag.toLocaleLowerCase("uk-UA") === normalizedTag
        )
      )
      .sort(
        (first, second) =>
          new Date(second.createdAt).getTime() -
          new Date(first.createdAt).getTime()
      );
  }, [posts.items, tag]);

  return (
    <>
      <Button component={Link} to="/" sx={{ mb: 2 }}>
        До всіх статей
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        Статті з тегом #{tag}
      </Typography>
      {posts.status === "loading" ? (
        [...Array(5)].map((_, index) => <Post key={index} isLoading />)
      ) : posts.status === "error" ? (
        <Typography color="error">
          Не вдалося завантажити статті. Спробуйте оновити сторінку.
        </Typography>
      ) : matchingPosts.length === 0 ? (
        <Typography>Статей із цим тегом поки немає.</Typography>
      ) : (
        matchingPosts.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            imageUrl={post.imageUrl || ""}
            user={post.user}
            createdAt={post.createdAt}
            viewsCount={post.viewsCount}
            commentsCount={3}
            tags={post.tags}
            isEditable={userData?._id === post.user?._id}
          />
        ))
      )}
    </>
  );
};
