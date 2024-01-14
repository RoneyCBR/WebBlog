import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircle from '@mui/icons-material/AccountCircle';


const friends = [
  "Friend 1",
  "Friend 2",
  "Friend 3",
  "Friend 4",
  "Friend 5"
]

export default function SideBarFriends() {

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        {
          friends?.map((item)=>{
            return (
              <ListItemButton key={item}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={item+''} />
              </ListItemButton>
            )
          
          })
        }
      </List>
    </Box>
  );
}