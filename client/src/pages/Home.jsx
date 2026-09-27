import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import {fetchPost, fetchTags} from "../redux/slices/post";

export const Home = () => {
    const userData = useSelector((state) => state.auth.data)
     const { posts, tags } = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    const isPostLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'

    useEffect(() => {
        dispatch(fetchPost())
        dispatch(fetchTags())
    }, [dispatch]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => (
              isPostLoading ? (<Post key={index}  isLoading={true} />) : (
                  <Post
                      _id={obj._id}
                      title={obj.title}
                      imageUrl={obj.imageUrl ? obj.imageUrl  : ''}
                      user={obj.user}
                      createdAt={obj.createAt}
                      viewsCount={obj.viewsCount }
                      commentsCount={3}
                      tags={obj.tags}
                      isEditable={userData?._id === obj.user._id}
                  />
                  )
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items}  isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Василь Петренко',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Це тестовий коментар',
              },
              {
                user: {
                  fullName: 'Іван Коваленко',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Якщо текст займає три або більше рядків, аватар не вирівнюється за верхнім краєм. Щоб це виправити, задайте відповідну властивість вирівнювання.',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
