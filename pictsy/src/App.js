import React, { Component } from 'react';
import ImageFilter from './components/filter/imageFilter.js';
import NavBar from './components/navigation/navbar.js';
import { IMGUR_CLIENT_KEY } from './config.js';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
    }
  }

  getImgurPhotos = () => {
    let imageGridArr;
    axios({
      method: 'get',
      baseURL: 'https://api.imgur.com/3/gallery/t/photography/top/month?mature=true&album_previews=true',
      headers: { 'Authorization': 'Client-ID ' + IMGUR_CLIENT_KEY }
    })
    .then(res => {
      imageGridArr = res.data.data.items.slice();
      this.setState({
        images: imageGridArr
      })
      console.log(res.data.data);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getImgurPhotos();
  }

  render() {
    let { images } = this.state;
    return (
      <div className="App">
        <NavBar/>
        <div className="photo-grid-container">
          <ImageFilter />
          <div className="masonry">
            {
              images.map((pic, index) => {
                return (
                  <div className="items" key={index}>
                    <img src={pic.images[0].link} alt=""/>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
