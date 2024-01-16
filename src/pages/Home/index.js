import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import SideBarOptions from '../../components/SideBarOptions/SideBarOptions';
// import SideBarFriends from '../../components/SideBarFriends/SideBarFriends';
import CardCreatePost from '../../components/CardCreatePost/CardCreatePost';
import { useUserContext } from '@/context/UserContext';
import SectionPost from './components/SectionPost';
import { getPosts } from '../../api/post/post';
import { useSearchContext } from '../../context/SearchContext';

const Home = () => {
  const { search } = useSearchContext();
  const { user } = useUserContext();
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [itemsTemp, setItemsTemp] = useState([]);

  const getAllPost = useCallback(async () => {
    try{
    setLoading(true);
    const res = await getPosts();
    console.log("debug res::",res);
    setItems(res);
    setItemsTemp(res?.reverse());
    } catch (error) {
      const newError  = error?.response?.data || 'Ocurrio un error, al cargar las publicaciones intente mas tarde!';
      setError(newError?.message || 'Ocurrio un error, al cargar las publicaciones intente mas tarde!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  },[setItems,setLoading]);

  const concatNewPost = useCallback((newPost) => {
    const nenwItems = [...items, newPost];
    setItemsTemp(nenwItems);
    setItems(nenwItems);
  }, [setItems, items]);

  useEffect(() => {
    getAllPost();
  },[]);

  useEffect(() => {
    try{
      if(search){
        const lowerCaseSearch = search.toLowerCase();
        setItems(itemsTemp.filter(item => 
          ['title', 'author', 'description'].some(field =>
            item[field]?.toLowerCase().includes(lowerCaseSearch)
          )
        ));
      }
      if(search === '' || !search){
        setItems(itemsTemp);
      }
    } catch (error) {
      console.error(error);
    }
  },[search, itemsTemp]);

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
            <CardCreatePost user={user} concatNewPost={concatNewPost}/>
            <SectionPost items={items} loading={loading} error={error}/>
          </div>
        </div>
        <div className={`${styles.item} ${styles.optionsFrends}`}>
          {/* <SideBarFriends /> */}
        </div>
      </main>
    </Fragment>
  )
}

export default Home
