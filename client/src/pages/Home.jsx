import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import {fetchPost, fetchTags} from "../redux/slices/post";
import axios from "../axios";

export const Home = () => {
    const userData = useSelector((state) => state.auth.data)
     const { posts, tags } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const [selectedTab, setSelectedTab] = React.useState(0)
    const [comments, setComments] = React.useState([])
    const [commentsStatus, setCommentsStatus] = React.useState('loading')

    const isPostLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'
    const sortedPosts = React.useMemo(() => {
        return [...posts.items].sort((first, second) => {
            if (selectedTab === 1) {
                return (second.viewsCount || 0) - (first.viewsCount || 0)
            }

            return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
        })
    }, [posts.items, selectedTab])
    const commentCounts = React.useMemo(() => {
        return comments.reduce((counts, comment) => {
            const postId = comment.post?._id
            if (postId) counts[postId] = (counts[postId] || 0) + 1
            return counts
        }, {})
    }, [comments])

    useEffect(() => {
        dispatch(fetchPost())
        dispatch(fetchTags())
        let isActive = true

        axios.get('/comments')
            .then(({ data }) => {
                if (isActive) {
                    setComments(data)
                    setCommentsStatus('loaded')
                }
            })
            .catch((error) => {
                console.warn(error)
                if (isActive) setCommentsStatus('error')
            })

        return () => {
            isActive = false
        }
    }, [dispatch]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={selectedTab}
        onChange={(_, value) => setSelectedTab(value)}
        aria-label="Сортування статей"
      >
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid xs={12} md={8} item>
          {(isPostLoading ? [...Array(5)] : sortedPosts).map((obj, index) => (
              isPostLoading ? (<Post key={index}  isLoading={true} />) : (
                  <Post
                      key={obj._id}
                      _id={obj._id}
                      title={obj.title}
                      imageUrl={obj.imageUrl ? obj.imageUrl  : ''}
                      user={obj.user}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount }
                      commentsCount={commentCounts[obj._id] || 0}
                      tags={obj.tags}
                      isEditable={userData?._id === obj.user._id}
                  />
                  )
          ))}
        </Grid>
        <Grid xs={12} md={4} item>
          <TagsBlock items={tags.items}  isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments}
            isLoading={commentsStatus === 'loading'}
            error={commentsStatus === 'error' ? 'Не вдалося завантажити коментарі.' : undefined}
            emptyMessage="Поки що немає коментарів до статей."
          />
        </Grid>
      </Grid>
    </>
  );
};
