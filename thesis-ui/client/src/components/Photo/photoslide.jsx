import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';

class PhotoSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: false,
      slideOnThumbnailHover: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: 'bottom',
      showVideo: {},
      currentIndex: 0,
      images: this.props.images_list,
      // || [
      //   {
      //     original: 'http://lorempixel.com/1000/600/nature/1/',
      //     thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      //   },
      //   {
      //     original: 'http://lorempixel.com/1000/600/nature/2/',
      //     thumbnail: 'http://lorempixel.com/250/150/nature/2/',
      //   },
      //   {
      //     original: 'http://lorempixel.com/1000/600/nature/3/',
      //     thumbnail: 'http://lorempixel.com/250/150/nature/3/',
      //   },
      // ],
    };
    // this.images = [
    //   {
    //     original: 'http://lorempixel.com/1000/600/nature/1/',
    //     thumbnail: 'http://lorempixel.com/250/150/nature/1/',
    //   },
    //   {
    //     original: 'http://lorempixel.com/1000/600/nature/2/',
    //     thumbnail: 'http://lorempixel.com/250/150/nature/2/',
    //   },
    //   {
    //     original: 'http://lorempixel.com/1000/600/nature/3/',
    //     thumbnail: 'http://lorempixel.com/250/150/nature/3/',
    //   },
    //   {
    //     thumbnail: `${PREFIX_URL}4v.jpg`,
    //     original: `${PREFIX_URL}4v.jpg`,
    //     embedUrl: 'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
    //     description: 'Render custom slides within the gallery',
    //     renderItem: this._renderVideo.bind(this),
    //   },
    //   {
    //     original: `${PREFIX_URL}image_set_default.jpg`,
    //     thumbnail: `${PREFIX_URL}image_set_thumb.jpg`,
    //     imageSet: [
    //       {
    //         srcSet: `${PREFIX_URL}image_set_cropped.jpg`,
    //         media: '(max-width: 1280px)',
    //       },
    //       {
    //         srcSet: `${PREFIX_URL}image_set_default.jpg`,
    //         media: '(min-width: 1280px)',
    //       },
    //     ],
    //   },
    //   {
    //     original: `${PREFIX_URL}1.jpg`,
    //     thumbnail: `${PREFIX_URL}1t.jpg`,
    //     originalClass: 'featured-slide',
    //     thumbnailClass: 'featured-thumb',
    //     description: 'Custom class for slides & thumbnails',
    //   },
    // ];
    // .concat(this._getStaticImages());
  }
  componentWillMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.slideInterval !== prevState.slideInterval ||
      this.state.slideDuration !== prevState.slideDuration
    ) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    }
  }
  //-----------------------------
  removeCurrentPhoto = () => {
    console.log('currentindex', this.state.currentIndex);
    // remove photo passed down from photo index
    this.props.removePhoto(this.state.currentIndex);
  };
  //-----------------------------
  makeMainPhoto = () => {
    // set image list
    this.props.mainPhoto(this.state.currentIndex);
  };

  _onImageClick(event) {
    console.debug(
      'clicked on image',
      event.target,
      'at index',
      this._imageGallery.getCurrentIndex(),
    );
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
    console.log('index', index);
    this.setState({ currentIndex: index });
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    this.setState({ [state]: event.target.value });
  }

  _handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked });
  }

  _handleThumbnailPositionChange(event) {
    this.setState({ thumbnailPosition: event.target.value });
  }

  //--------------------------------------
  // _getStaticImages() {
  //   const images = [];
  //   for (let i = 2; i < 12; i++) {
  //     images.push({
  //       original: `${PREFIX_URL}${i}.jpg`,
  //       thumbnail: `${PREFIX_URL}${i}t.jpg`,
  //     });
  //   }

  //   return images;
  // }
  //---------------------------------

  _resetVideo() {
    this.setState({ showVideo: {} });

    if (this.state.showPlayButton) {
      this.setState({ showGalleryPlayButton: true });
    }

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true });
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !this.state.showVideo[url];
    this.setState({
      showVideo: this.state.showVideo,
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  _renderVideo(item) {
    return (
      <div className="image-gallery-image">
        {this.state.showVideo[item.embedUrl] ? (
          <div className="video-wrapper">
            <a className="close-video" onClick={this._toggleShowVideo.bind(this, item.embedUrl)} />
            <iframe width="560" height="315" src={item.embedUrl} frameBorder="0" allowFullScreen />
          </div>
        ) : (
          <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
            <div className="play-button" />
            <img src={item.original} />
            {item.description && (
              <span className="image-gallery-description" style={{ right: '0', left: 'initial' }}>
                {item.description}
              </span>
            )}
          </a>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.images_list && this.props.images_list.length >= 1 ? (
          <div>
            <button onClick={this.makeMainPhoto}>Make Main Photo</button>
            <button onClick={this.removeCurrentPhoto}>Delete Current Image</button>
          </div>
        ) : null}

        <section className="app">
          {this.props.images_list && this.props.images_list.length > 0 ? (
            <ImageGallery
              ref={i => (this._imageGallery = i)}
              items={this.props.images_list}
              lazyLoad={false}
              onClick={this._onImageClick.bind(this)}
              onImageLoad={this._onImageLoad}
              onSlide={this._onSlide.bind(this)}
              onPause={this._onPause.bind(this)}
              onScreenChange={this._onScreenChange.bind(this)}
              onPlay={this._onPlay.bind(this)}
              infinite={this.state.infinite}
              showBullets={this.state.showBullets}
              showFullscreenButton={
                this.state.showFullscreenButton && this.state.showGalleryFullscreenButton
              }
              showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
              showThumbnails={this.state.showThumbnails}
              showIndex={this.state.showIndex}
              showNav={this.state.showNav}
              thumbnailPosition={this.state.thumbnailPosition}
              slideDuration={parseInt(this.state.slideDuration)}
              slideInterval={parseInt(this.state.slideInterval)}
              slideOnThumbnailHover={this.state.slideOnThumbnailHover}
              additionalClass="app-image-gallery"
            />
          ) : (
            <div>noPhotos</div>
          )}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    images_list: state.images,
  };
}

export default connect(mapStateToProps)(PhotoSlide);
