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
    const [comments, setComments] = useState([])
    const [commentsStatus, setCommentsStatus] = useState('loading')
    const { id} = useParams()

    useEffect(() => {
        let isActive = true
        setIsLoading(true)
        setCommentsStatus('loading')

        axios.get(`/posts/${id}`)
            .then(res => {
                if (isActive) {
                    setData(res.data)
                    setIsLoading(false)
                }
            }).catch(err => {
            console.warn(err)
            if (isActive) {
                setIsLoading(false)
                alert('Помилка під час отримання статті')
            }
        })

        axios.get(`/posts/${id}/comments`)
            .then(({ data: loadedComments }) => {
                if (isActive) {
                    setComments(loadedComments)
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
          commentsCount={comments.length}
          tags={data.tags}
          isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={commentsStatus === 'loading'}
        error={commentsStatus === 'error' ? 'Не вдалося завантажити коментарі.' : undefined}
        emptyMessage="До цієї статті ще немає коментарів."
      >
        <Index
          postId={id}
          onCommentCreated={(comment) => setComments((current) => [comment, ...current])}
        />
      </CommentsBlock>
    </>
  );
};
