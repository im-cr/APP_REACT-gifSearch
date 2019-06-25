import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import axios from 'axios';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      users: [],
      loading:true
    };
  }

  componentDidMount(){
    // fetch('http://api.giphy.com/v1/gifs/trending?api_key=pkuq8qra2d1qFjL5d5d5pUng6CEgTCve')
    // .then(response => response.json())
    // .then(responseData => {
    //   this.setState({ gifs: responseData.data });
    // })
    // .catch(error => {
    //   console.log('Error fetching and parsing Data', error);
    // });

    // fetch('https://jsonplaceholder.typicode.com/users/2')
    //   .then(response => response.json())
    //   .then(data => {
      

    //     this.setState({ users: data })
    //   })
    this.performSearch();
    
  }

  performSearch = (query = 'trending') => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=pkuq8qra2d1qFjL5d5d5pUng6CEgTCve`)
      .then(response => {
        this.setState({
          gifs: response.data.data,
          loading:false
        });
      })
      .catch(error => {
        console.log('error fetching', error);
      })
  }

  render() { 
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>      
          </div>   
        </div>    
        <div className="main-content">
        {
          (this.state.loading)
          ?<p>loading</p>
          :<GifList data={this.state.gifs} />
        }
        </div>
      </div>
    );
  }
}
