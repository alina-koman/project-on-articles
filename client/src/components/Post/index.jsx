import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import axios from '../../axios';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import {useDispatch} from "react-redux";
import {fetchRemovePost} from "../../redux/slices/post";
import {logout} from "../../redux/slices/auth";

export const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = async () => {
    if (window.confirm('Ви впевнені, що хочете видалити статтю?')) {
      try {
        await dispatch(fetchRemovePost(_id)).unwrap()
      } catch (error) {
        console.warn(error)
        alert('Не вдалося видалити статтю')
      }
    }
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {!isFullPost && (
        <Link
          className={styles.cardLink}
          to={`/posts/${_id}`}
          aria-label={`Відкрити статтю: ${title}`}
        />
      )}
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={ `/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={new URL(imageUrl, axios.defaults.baseURL).href}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {title}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tags/${encodeURIComponent(name)}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
