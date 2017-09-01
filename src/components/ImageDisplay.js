import React, { Component } from 'react';

const ImageDisplay=(props)=>{
  const pics = props.photos.map((photo)=>{
    return (<img src={photo.img_src} key={photo.id} alt=" " className="img-responsive img"/>)
  })

    return (
      <div className="pics_grid">
        {pics}
      </div>
    )
}

export default ImageDisplay;
