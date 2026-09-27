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
    const [selectedTab, setSelectedTab] = React.useState(0)

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

    useEffect(() => {
        dispatch(fetchPost())
        dispatch(fetchTags())
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
      <Grid container spacing={4}>
        <Grid xs={8} item>
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
