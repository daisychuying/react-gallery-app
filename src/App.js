import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
//Import Components
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import NotFound from './Components/NotFound';
import PhotoList from './Components/PhotoList';

import apiKey from './config';
import './index.css';

export default class App extends Component {
  
    constructor() {
      super();
      this.state = {
        cats: [],
        dogs: [],
        computers: [],
        search: [],
        loading: true
      };
    } 
  
    // componentDidMount(){
    //   axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
    //     .then(response => {
    //         this.setState({
    //           cats: response.data.photos.photo,
    //           loading: false
    //         });
    //   })
    //   axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
    //     .then(response => {
    //         this.setState({
    //           dogs: response.data.photos.photo,
    //           loading: false
    //         });
    //   });
    //   axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
    //     .then(response => {
    //         this.setState({
    //           computers: response.data.photos.photo,
    //           loading: false
    //         });
    //   });
    // }

    // performSearch = (query) => {
    //   axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    //       this.setState({
    //         search: response.data.photos.photo,
    //         loading: false
    //       });
    //     })
    //     .catch(error => {
    //       console.log('Error fetching and parsing data', error);
    //     });    
    // }

    componentDidMount() {
      this.searchFunction('cats');
      this.searchFunction('dogs');
      this.searchFunction('computers');
    }

    componentWillUnmount(){
      clearInterval(this.state.cats);
      clearInterval(this.state.dogs);
      clearInterval(this.state.computers);
      clearInterval(this.state.search);
    }
    
    
    searchFunction = (query) => {
      this.setState({loading : true});
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          if (query === 'cats') {
            this.setState({
              cats: response.data.photos.photo,
              loading: false
            });
          } else if (query === 'dogs') {
            this.setState({
              dogs: response.data.photos.photo,
              loading: false
            });
          } else if (query === 'computers') {
            this.setState({
              computers: response.data.photos.photo,
              loading: false
            });
          } else {
            this.setState({
              search: response.data.photos.photo,
              loading: false
            });
          }
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });    
    }

    render() { 
      return (
          <BrowserRouter>
              <div className='container'>
              <SearchForm onSearch={this.searchFunction} />
              <Nav />
              {
                (this.state.loading)
                ? <p className="loading"> Loading... </p>  
                :
              <Switch>
                <Route exact path="/" render={ () => <Redirect to='/cats' /> } />
                <Route exact path="/cats" render={ () => <PhotoList data={ this.state.cats } loading={ this.state.loading } alt= 'cats' /> } />
                <Route exact path="/dogs" render={ () => <PhotoList data={ this.state.dogs } loading={ this.state.loading }/> } />
                <Route exact path="/computers" render={ () => <PhotoList data={ this.state.computers } loading={ this.state.loading }/> } />
                <Route exact path="/:search" render={ () => <PhotoList data={ this.state.search } loading={ this.state.loading }/> } />
                <Route component={NotFound} />
              </Switch>
              }
              </div>
          </BrowserRouter>
      );
    }
  }
  