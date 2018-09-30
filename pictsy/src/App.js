import React, { Component } from 'react';
import ImageFilter from './components/filter/imageFilter.js';
import NavBar from './components/navigation/navbar.js';
import ImageGrid from './components/grid/imageGrid.js';
import { IMGUR_CLIENT_KEY } from './config.js';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      dataLoaded: false,
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
        images: imageGridArr,
        dataLoaded: true
      })
    })
    .catch(err => console.log(err));
  }

  filterImgurPhotos = (filter) => {
    let sorted = this.state.images.sort((a, b) => b[filter] - a[filter]);
    this.setState({
      images: sorted,
    })
  }
  
  async componentDidMount() {
    await this.getImgurPhotos();
  }

  render() {
    let { images, dataLoaded } = this.state;
    let cleanImgData = images.filter(x => x.images !== undefined);
    console.log(cleanImgData);
    return (
      <div className="App">
        <NavBar/>
        <div className="photo-grid-container">
          <ImageFilter 
            filterPhotos={this.filterImgurPhotos}
            loaded={dataLoaded}
          />
          <ImageGrid 
            cleanImgs={cleanImgData}
          />
        </div>
      </div>
    );
  }
}

export default App;
