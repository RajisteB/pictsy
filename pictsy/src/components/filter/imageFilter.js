import React, { PureComponent } from 'react'
const Main = (props) => <div className="title">{props.children}</div>

class ImageFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.activeRef = [];
    this.state = {
      filteredContent: ''
    }
  }

  handleFilterClick = async (id, type) => {
    let content;
    // styling
    this.activeRef.map((a,i) => {
      a.style.opacity = 1;
      a.style.background = 'black';
      a.style.color = 'white';
      return a;
    })
    this.activeRef[id].style.border = '0.5px solid black';
    this.activeRef[id].style.background = 'white';
    this.activeRef[id].style.color = 'black';
    this.activeRef[id].style.opacity = 0.4;
    content = Object.keys(FilteredList)
      .find(item => FilteredList[item] === type)
      .toLowerCase();
    // set state
    this.setState({
      filteredContent: content
    })
    // filtering images
    this.props.filterPhotos(type);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loaded !== this.props.loaded) 
      this.handleFilterClick(0, 'views');
  }

  render() {
    return (
      <Main>
        <h1>Popular Photos</h1>
        <h2>Images with the most <span style={{fontStyle: 'italic'}}>{this.state.filteredContent}</span> in the past 30 days.</h2>
        <br/>
        <li style={{ color: '#888', listStyleType: 'none' }}>Sort By:</li>
        <ul className="filter-list">
          {
            Object.keys(FilteredList).map((f, idx) => {
              return (
                <li 
                  key={idx}
                  className="filter-item" 
                  onClick={() => this.handleFilterClick(idx, FilteredList[f])}
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

const FilteredList = {
  Views: 'views',
  Comments: 'comment_count',
  Upvotes: 'ups',
  Downvotes: 'downs',
  Favorites: 'favorite_count'
}

export default ImageFilter