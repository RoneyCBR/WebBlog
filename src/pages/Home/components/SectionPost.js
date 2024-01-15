import React, { Fragment, useEffect, useState } from 'react'
import CardPost from '../../../components/CardPost/CardPost'
import { getPosts } from '../../../api/post/post';

const SectionPost = () => {

  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);

  const init = async () => {
    setLoading(true);
    const res = await getPosts();
    setItems(res);
    console.log("debug SectionPost::",res);
    setLoading(false);
  }

  useEffect(() => {
    init();
  },[]);

  return (
    <Fragment>
      {loading && <div>Loading...</div>}
      {
        !loading && items.map((item,index) => (
          <CardPost key={`${item?.id+''}${index}`} item={item} />
        ))
      }
    </Fragment>
  )
}

export default SectionPost
