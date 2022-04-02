import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = props => { 
    const results = props.data;
    console.log(props);
    console.log(props.data);
    let photos;
    if ( results.length > 0 ) {
        photos = results.map(photo => 
            <Photo 
            url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
            title={photo.title}
            key={photo.id}
            /> );
    } else {
        photos = <NotFound />
    };
    return(
        <div className="photo-container">
            <h2> Picture </h2>
            {this.props.loading? <p>Loading..</p> : 
            <ul>
                {photos}
            </ul>}
        </div>
      );
  }

export default PhotoList;
