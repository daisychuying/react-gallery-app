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
      this.textInput = React.createRef();
      this.state = {
        cats: [],
        lajolla: [],
        sunset: [],
        search: [],
        loading: true,
      };
    } 

    //trigger searchFunction after the component has been mounted
    componentDidMount() {
      this.searchFunction('cats');
      this.searchFunction('La Jolla');
      this.searchFunction('sunset');
      this.searchFunction();
    }
    
    //This method fetch the data from fliker api and use response to set the state of photos
    searchFunction = (query) => {
      this.setState({loading : true});
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          if (query === 'cats') {
            this.setState({
              cats: response.data.photos.photo,
              loading: false
            });
          } else if (query === 'La Jolla') {
            this.setState({
              lajolla: response.data.photos.photo,
              loading: false
            });
          } else if (query === 'sunset') {
            this.setState({
              sunset: response.data.photos.photo,
              loading: false
            });
          } else {
            this.setState({
              search: response.data.photos.photo,
              loading: false,
              // query: query
            });
          }
          console.log(this.state.search);
        })
        //load error message if there exists
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });    
    }

    render() { 
      return (
        //A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
          <BrowserRouter>
              <div className='container'>
              <h1>Daisy's Photo Gallery</h1>
              <SearchForm onSearch={this.searchFunction} />
              <Nav />
              {
                (this.state.loading)
                ? <p className="loading"> Loading... </p>  
                :
              //<Switch /> component will only render the first route that matches/includes the path.
              //Redirect to cat route in home page

              <Switch>
                <Route path="/search/:query" render={ () => <PhotoList data={ this.state.search } loading={ this.state.loading }/> } />
              
                <Route exact path="/" render={ () => <Redirect to='/cats' /> } />
                <Route exact path="/cats" render={ () => <PhotoList data={ this.state.cats } loading={ this.state.loading } alt= 'cats' /> } />
                <Route exact path="/lajolla" render={ () => <PhotoList data={ this.state.lajolla } loading={ this.state.loading }/> } />
                <Route exact path="/sunset" render={ () => <PhotoList data={ this.state.sunset } loading={ this.state.loading }/> } />
                
                <Route component={NotFound} />
              </Switch>
              }
              </div>
          </BrowserRouter>
      );
    }
  }
  