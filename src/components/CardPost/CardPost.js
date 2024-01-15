import React from 'react'
import Card from '@mui/material/Card'
import styles from './CardPost.module.css'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import CardMedia from '@mui/material/CardMedia'

const CardPost = ({item}) => {

  const thumbnailSrc = `data:image/jpeg;base64,${item?.thumbnail}`; 

  return (
    <Card sx={{borderRadius:'20px'}}>
      <div className={styles.bodyCard}>
        <div className={styles.headerCard}>
          <Avatar
            src="https://picsum.photos/200/300" 
            alt="profile" 
          />
          <Box flex={1} sx={{display:'flex',justifyContent:'flex-end'}}>
            <div>
            <IconButton >
              <MoreHorizIcon />
            </IconButton>
            <IconButton >
              <CloseIcon />
            </IconButton>
            </div>
          </Box>
        </div>
        <div>
          <p>{item?.post}</p>
        </div>
        <Card className={styles.cardPostContentImage}>
          <CardMedia
            component="img"
            loading="lazy"
            alt="img-post" 
            src={item?.thumbnail ? thumbnailSrc : '/banner-login.jpg'}
            sx={{
              width:'100%',
              height:'100%',
              objectFit:'cover'
            }}
          />
        </Card>
        <div className={styles.footerCard}>
          <p>Likes: 11</p>
          <p>Shared: 22</p>
        </div>
        <Divider/>
        <div className={styles.footerCard}>
          <Button variant='contained' sx={{ flex:1, textTransform:'none', background:'transparent', color:'#000' }} >Like</Button>
          <Button variant='contained' sx={{ flex:1, textTransform:'none', background:'transparent', color:'#000' }} >Share</Button>
        </div>
      </div>
    </Card>
  )
}

export default CardPost
