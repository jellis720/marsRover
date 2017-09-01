import React, { Component } from 'react';

let GetImageButton = (props)=>{
    return (
      <div className="searchButton">
        <button onClick={props.search} className="btn btn-primary">
          Display Images
        </button>
      </div>
    );

}

export default GetImageButton;
