import React, { Component } from 'react'
import Modal from '../modal/modal.js';

class ImageGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modalImageIndex: 0,
    }
  }

  handleModal = (index) => {
    this.setState({
      isOpen: !this.state.isOpen,
      modalImageIndex: index
    })
  }

  render() {
    let { isOpen, modalImageIndex } = this.state; 
    let { cleanImgs } = this.props;
    return (
      <div className="masonry">
        {
          cleanImgs.map((pic, index) => {
            return (
              <div className="items" key={index} onClick={() => this.handleModal(index)}>
                <img src={pic.images[0].link} alt="" />
                <div className="img-overlay">
                  <div className="faves">
                    <i className="far fa-heart fa-lg" style={{color: 'tomato'}}></i>
                    <h4>{pic.favorite_count.toLocaleString()}</h4>
                  </div>
                  <div className="views">
                    <i className="far fa-eye fa-lg"></i>
                    <h4>{pic.views.toLocaleString()}</h4>
                  </div>
                </div>
              </div>
            )
          })
        }
        <Modal
          image={cleanImgs[modalImageIndex]}
          isOpen={isOpen}
          handleModal={this.handleModal}
        />
      </div>
    )
  }
} 

export default ImageGrid;