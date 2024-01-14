import React, { Fragment } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import SideBarOptions from '../../components/SideBarOptions/SideBarOptions';
import SideBarFriends from '../../components/SideBarFriends/SideBarFriends';
import CardCreatePost from '../../components/CardCreatePost/CardCreatePost';
import { useUserContext } from '@/context/UserContext';
import SectionPost from './components/SectionPost';

const Home = () => {
  const { user } = useUserContext();
  return (
    <Fragment>
      <Header />
      <div style={{width:'100%', height:'70px'}}></div>
      <main className={styles.main}>
        <div className={`${styles.item} ${styles.optionsContainer}`}>
          <SideBarOptions/>
        </div>
        <div className={`${styles.item}`} >
          <div className={`${styles.postContainer}`}>
            <CardCreatePost user={user} />
            <SectionPost />
          </div>
        </div>
        <div className={`${styles.item} ${styles.optionsFrends}`}>
          <SideBarFriends />
        </div>
      </main>
    </Fragment>
  )
}

export default Home
