
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News  from './components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API
  state = {
  progress:0 , 
  
}

setProgress=  (progress)=>{
  this.setState({progress:progress})
} 
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        
      />
        <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey}  key={'1'} pagesize={5} country="us" category="general" />} />
          
          <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey}  key={'2'} pagesize={5} country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key={'3'} pagesize={5} country="us" category="entertainment" />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey}  key={'4'} pagesize={5} country="us" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key={'5'} pagesize={5} country="us" category="sports" />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key={'6'} pagesize={5} country="us" category="health" />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key={'7'} pagesize={5} country="us" category="technology" />} />
        
      </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

