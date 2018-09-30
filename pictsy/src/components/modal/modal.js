import React, { Component } from 'react'
import ReactModal from 'react-modal';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      name: '',
      comment: '',
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const blurb = {
      name: this.state.name,
      comment: this.state.comment
    }
    this.setState({
      name: '',
      comment: '',
      comments: [...this.state.comments, blurb]
    })
  }

  handleCloseModal = () => {
    this.props.handleModal();
    this.setState({
      comments: [],
    })
  }

  render() {
    let { image } = this.props;
    let { comments } = this.state;
    let userComments;

    if (comments.length > 0) {
      userComments = comments.map((c,idx) => {
        return (
          <ul key={idx}>
            <li>
              <h3>{c.comment}</h3>
              <h6
                style={{opacity: 0.7}}
              >- {c.name}</h6>
            </li>
          </ul>
        )
      })
    } else {
      userComments = <h3>Be the first to comment!</h3>
    }

    console.log(this.state.comments);
    return (
      <ReactModal
        shouldCloseOnOverlayClick={true}
        shouldReturnFocusAfterClose={true}
        overlayClassName="modal-overlay"
        className="modal-content-container"
        isOpen={this.props.isOpen}
      >
        <div className="exit-modal" onClick={this.handleCloseModal}>
          <h1>X</h1>
        </div>
        <div className="modal-content">
          <div className="img-container">
            {
              image ? <img src={image.images[0].link} alt="" /> : null
            }
          </div>
          <div className="comments">
            <form>
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                value={this.state.name}
                onChange={(e) => this.handleInputChange(e)}
              />
              <label>Comment:</label>
              <textarea 
                name="comment" 
                id="comment-area"
                cols="18" 
                rows="3" 
                value={this.state.comment}
                onChange={(e) => this.handleInputChange(e)}
              ></textarea>
              <br/>
              <button type="submit" onClick={(e) => this.handleSubmit(e)}>
                Submit Comment
              </button>
            </form>
            <div className="image-comments">
              <h1>Comments:</h1>
              {userComments}
            </div>
          </div>
        </div>
      </ReactModal>
    )
  }
}
ReactModal.setAppElement('#root');
export default Modal;