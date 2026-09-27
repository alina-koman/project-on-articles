import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const { id} = useParams()

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            }).catch(err => {
            console.warn(err)
            alert('Помилка під час отримання статті')
        }
    )
    }, [id])

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }

  return (
    <>
      <Post
          _id={data._id}
          title={data.title}
          imageUrl={data.imageUrl}
          user={data.user}
          createdAt={data.createdAt}
          viewsCount={data.viewsCount }
          commentsCount={3}
          tags={data.tags}
          isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Василь Петренко",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Це тестовий коментар 555555",
          },
          {
            user: {
              fullName: "Іван Коваленко",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "Якщо текст займає три або більше рядків, аватар не вирівнюється за верхнім краєм. Щоб це виправити, задайте відповідну властивість вирівнювання.",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
