import React, { Fragment } from 'react'
import CardPost from '../../../components/CardPost/CardPost'

const SectionPost = ({loading,items,error}) => {


  return (
    <Fragment>
      <center>{error}</center>
      {loading && <div>Loading...</div>}
      {
        !loading && items?.map((item,index) => (
          <CardPost key={`${item?.id+''}${index}`} item={item} />
        )).reverse()
      }
    </Fragment>
  )
}

export default SectionPost
