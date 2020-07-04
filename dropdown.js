'use strict';

class DorpDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      searchResult: []
    };
  }

  componentDidMount() { // Hnadle outside clicks
    document.onclick = (e) => {
      const allowedIds = ["movieList", "containerRef"];
      if (e.target.parentNode) {
        if (!allowedIds.includes(e.target.parentNode.id)) {
          this.setState({
            searchResult: []
          });
        }
      }
    }
  }


  getMovies(e) { // get the movie list
    if (e.target.value.length >= 3) {
      fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=498cb491&page=1&s=${e.target.value}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.Response === "True") {
            this.setState({
              searchResult: data.Search
            });
          } else {
            this.setState({
              searchResult: []
            });
          }
        }).catch((err) => {
          console.log(err);
        });
    }
    if (e.target.value.length >= 0) {
      this.setState({
        searchResult: []
      });
    }
  }

  addIntoList(title) { // Add to pills
    const arr = this.state.movieList;
    if (arr.length <= 5) {
      arr.push(title);
      this.setState({
        movieList: arr,
        searchResult: []
      });
      console.log(this.state.movieList);
    }
  }

  renderLi() { // Render Lists
    return this.state.searchResult.map((val) => {
      return (
        <li onClick={() => this.addIntoList(val)} key={val.imdbID}>
          {val.Title}
        </li>);
    });
  }

  removeSpan(val) { // Remove functionality
    const arr = this.state.movieList;
    const newArr = arr.filter((x) => {
      return x.imdbID !== val.imdbID;
    });

    this.setState({
      movieList: newArr
    });
  }

  selectedMovies() { // Pills
    return this.state.movieList.map((val) => {
      return (
        <span key={val.imdbID} className="parent-round">
          {val.Title} <span className="child-span" onClick={() => this.removeSpan(val)}>X</span>
        </span>
      )
    });
  }

  render() {
    return (
      <div id="containerRef">
        <input type="text" onClick={() => this.getMovies(event)} onChange={() => this.getMovies(event)} />
        {this.selectedMovies()}
        <ul id="movieList">
          {this.renderLi()}
        </ul>
      </div>
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<DorpDown />, domContainer);