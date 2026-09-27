import React, {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {useNavigate, Navigate, useParams} from "react-router-dom";
import axios from "../../axios";


export const AddPost = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    const [isLoading, setLoading] = React.useState(false)
    const [text, setText] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [tags, setTags] = React.useState('')
    const [imageUrl, setImageUrl]  = React.useState('')
    const inputFileRef = React.useRef(null)

    const isEditing = Boolean(id)

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)
            const {data} = await axios.post('/upload', formData)
            setImageUrl(data.url)
        } catch (error) {
            console.warn(error)
            alert('Помилка при завантаженні файлу')
         }
    };

    const onClickRemoveImage = () => {
        const remove = window.confirm('Ви впевнені, що хочете видалити зображення?')
        if (remove) {setImageUrl('')}
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    },[]);

    const onSubmit = async () => {
        try {
            setLoading(true)

            const fields = {
                title,
                tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
                ...(imageUrl && { imageUrl }),
                text
            }
            const { data } = isEditing
                ? await axios.patch(`/posts/${id}` , fields)
                : await axios.post('/posts', fields)

            const _id = isEditing ? id : data._id

            navigate(`/posts/${_id}`)
        } catch (error) {
            console.warn(error)
            console.log('Помилка під час створення статті!', error.response?.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
         if (id) {
             axios.get(`/posts/${id}`).then(({data}) => {
                 setTitle(data.title)
                 setText(data.text)
                 setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '')
                 setImageUrl(data.imageUrl || data.imagesUrl || '')
             }).catch(error => {
                 console.warn(error)
                 alert('Помилка під час отримання статті!')
             })
         }
    }, [id])

    const options = React.useMemo(
    () => ({
        spellChecker: false,
        maxHeight: '400px',
        autofocus: true,
        placeholder: 'Введіть текст статті...',
        status: false,
        autosave: {
            enabled: true,
            delay: 1000,
            uniqueId: id ? `post-${id}` : 'new-post',
        },
        }),
    [id],
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/" />
    }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Завантажити обкладинку
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                Видалити
            </Button>
            <img className={styles.image} src={new URL(imageUrl, axios.defaults.baseURL).href} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статті..."
        value={title}
        onChange={e => setTitle(e.target.value) }
        fullWidth
      />
      <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Теги"
          value={tags}
          onChange={e => setTags(e.target.value) }
          fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
            {isEditing ? 'Зберегти' : 'Опублікувати'}
        </Button>
        <a href="/">
          <Button size="large">Скасувати</Button>
        </a>
      </div>
    </Paper>
  );
};
