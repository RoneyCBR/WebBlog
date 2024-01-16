import React, { useCallback, useState, useRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import styles from './CardCreatePost.module.css'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import { useOffLineContext } from '../../context/OffLineContext'
import { newPostFetch } from '../../api/post/post'

const propTypes = {
  user: PropTypes.object
}

const CardCreatePost = ({user, concatNewPost}) => {
  const { isOnline } = useOffLineContext();
  const [newPost, setNewPost] = useState(null);
  const fileInput = useRef(null);

  const handleValue = useCallback((e) => {
    const { name, value } = e.target;
    setNewPost({...newPost, [name+'']: value})
  },[setNewPost,newPost]);

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    setNewPost({...newPost,'thumbnail': file})
  },[newPost]);

  const handleCancelPost = useCallback(()=>{
    setNewPost(null)
  },[setNewPost]);

  const handleSubmit = useCallback(async (newPost) => {
    try{
      const { title, author, description, thumbnail } = newPost;
      const body = {
        title,
        author,
        description,
        thumbnail: thumbnail || null,
        userId: user?.pk
      }
      const res = await newPostFetch(body);
      concatNewPost(res?.post)
      setNewPost(null);
    } catch (error) {
      console.error(error);
    }
  },[user,concatNewPost,setNewPost]);

  const activeOptions = (newPost?.title)

  return (
    <Card sx={{borderRadius:'20px'}}>
      <input
        type="file"
        ref={fileInput}
        style={{ display: 'none' }} 
        onChange={handleFileChange}
        accept="image/*,video/*"
      />
      <div className={styles.bodyCard}>
        <div className={styles.headerCard}>
          <Avatar
            src="https://picsum.photos/200/300" 
            alt="profile" 
          />
          <TextField 
            label="Title"
            variant="outlined"
            size="small"
            sx={{ flex:1 }}
            placeholder={`What do you think, ${user?.username}?`}
            disabled={!isOnline}
            value={newPost?.title || ''}
            name="title"
            onChange={handleValue}
          />
          {
            activeOptions && 
            <Fragment>
              <IconButton 
                sx={{border:'1px solid #ccc'}}
                alt="delete" 
                onClick={handleCancelPost} 
                disabled={!isOnline}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton 
                sx={{transform:'rotate(-25deg)',border:'1px solid #ccc'}}
                alt="send"
                disabled={!isOnline || !newPost?.title}
                onClick={()=>handleSubmit(newPost)}
              >
                <SendIcon />
              </IconButton>
            </Fragment>
          }
        </div>
        {activeOptions && <Divider/>}
        {newPost?.title &&
        <div style={{display:'flex',flexDirection:'column',gap:'1em'}}>
          <TextField 
            label="Author"
            variant="outlined"
            size="small"
            sx={{ flex:1 }}
            placeholder={`Author`}
            disabled={!isOnline}
            value={newPost?.author || ''}
            name="author"
            onChange={handleValue}
          />
          <TextField 
            label="Description"
            variant="outlined"
            size="small"
            sx={{ flex:1 }}
            placeholder={`Description`}
            disabled={!isOnline}
            value={newPost?.description || ''}
            name="description"
            onChange={handleValue}
            multiline
            minRows={4}
          />
        </div>
        }
        {
        newPost?.thumbnail && 
        <Card className={styles.cardPostContentImage}>
          <CardMedia
            component={newPost.thumbnail.type.startsWith('image') ? "img" : "video"}
            loading="lazy"
            alt="img-post" 
            src={URL.createObjectURL(newPost.thumbnail)}
            sx={{
              width:'100%',
              height:'100%',
              objectFit:'cover'
            }}
            controls={newPost.thumbnail.type.startsWith('video')}
          />
        </Card>
        }
        <Divider/>
        <div className={styles.footerCard}>
        <Button variant='contained' sx={{ flex:1, textTransform:'none' }} disabled={!isOnline} >Group</Button>
        <Button variant='contained' sx={{ flex:1, textTransform:'none' }} disabled={!isOnline} onClick={handleButtonClick} >Image/Video</Button>
        <Button variant='contained' sx={{ flex:1, textTransform:'none' }} disabled={!isOnline} >Activity</Button>
        </div>
      </div>
    </Card>
  )
}

CardCreatePost.propTypes = propTypes

export default CardCreatePost
