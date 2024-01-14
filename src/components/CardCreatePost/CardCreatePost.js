import React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import styles from './CardCreatePost.module.css'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const propTypes = {
  user: PropTypes.object
}

const CardCreatePost = ({user}) => {
  return (
    <Card sx={{borderRadius:'20px'}}>
      <div className={styles.bodyCard}>
        <div className={styles.headerCard}>
          <Avatar
            src="https://picsum.photos/200/300" 
            alt="profile" 
          />
          <TextField label="" variant="outlined" size='small' sx={{ flex:1 }} placeholder={`What do you think, ${user?.username}?`} />
        </div>
        <Divider/>
        <div className={styles.footerCard}>
        <Button variant='contained' sx={{ flex:1, textTransform:'none' }} >Group</Button>
        <Button variant='contained' sx={{ flex:1, textTransform:'none' }} >Image/Video</Button>
        <Button variant='contained' sx={{ flex:1, textTransform:'none' }} >Activity</Button>
        </div>
      </div>
    </Card>
  )
}

CardCreatePost.propTypes = propTypes

export default CardCreatePost
