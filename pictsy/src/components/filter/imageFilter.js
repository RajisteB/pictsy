import React, { Component } from 'react'
const Main = (props) => <div className="title">{props.children}</div>

class ImageFilter extends Component {
  constructor(props) {
    super(props);
    this.activeRef = [];
  }

  handleFilterClick = (id) => {
    this.activeRef.map((a,i) => {
      a.style.opacity = 1;
      a.style.background = 'black';
    })
    this.activeRef[id].style.opacity = 0.4;
    this.activeRef[id].style.background = 'skyblue';
  }

  componentDidMount() {
    this.handleFilterClick(0);
  }

  render() {
    const FilteredList = {
      Date: 'datetime',
      Comments: 'comment_count',
      Upvotes: 'ups',
      Downvotes: 'downs',
      Favorites: 'favorite_count'
    }

    return (
      <Main>
        <h1>Popular Photos</h1>
        <h2>Images with the most views in the past 30 days.</h2>
        <br/>
        <li style={{ color: '#888', listStyleType: 'none' }}>Sort By:</li>
        <ul className="filter-list">
          {
            Object.keys(FilteredList).map((f, idx) => {
              return (
                <li 
                  key={idx}
                  className="filter-item" 
                  onClick={() => this.handleFilterClick(idx)}
                  ref={(ref) => this.activeRef[idx] = ref}
                >{f}</li>
              )
            })
          }
        </ul>
      </Main>
    )
  }
}

export default ImageFilter