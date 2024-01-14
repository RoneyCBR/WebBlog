import React, { useCallback, useState, useRef } from 'react'
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

const propTypes = {
  user: PropTypes.object
}

const CardCreatePost = ({user}) => {

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

  const activeOptions = (newPost?.post || newPost?.thumbnail )

  
  console.log("debug newPost::",newPost)

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
            label=""
            variant="outlined"
            size="small"
            sx={{ flex:1 }}
            placeholder={`What do you think, ${user?.username}?`}
            value={newPost?.post || ''}
            name="post"
            onChange={handleValue}
          />
          {
            activeOptions && 
            <IconButton sx={{transform:'rotate(-25deg)',border:'1px solid #ccc'}} alt="send">
              <SendIcon />
            </IconButton>
          }
        </div>
        {activeOptions && <Divider/>}
        {newPost?.post &&
        <div style={{display:'flex',flexDirection:'column'}}>
          Post:
          <p>{newPost?.post}</p>
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
        <Button variant='contained' sx={{ flex:1, textTransform:'none' }} >Group</Button>
        <Button variant='contained' sx={{ flex:1, textTransform:'none' }} onClick={handleButtonClick} >Image/Video</Button>
        <Button variant='contained' sx={{ flex:1, textTransform:'none' }} >Activity</Button>
        </div>
      </div>
    </Card>
  )
}

CardCreatePost.propTypes = propTypes

export default CardCreatePost
