import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static propTypes ={
      country:PropTypes.string,
      pagesize:PropTypes.number,
      category : PropTypes.string
    }
    static defaultProps = {
      country : "us",
      pagesize: 8

    }
      
    constructor(){
        super();
        this.state={
            articles:[],
            loading:true,
            page: 1,
            total: 0
        }

    }
    update = async()=>{
      this.props.setProgress(10)
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`
      this.setState({loading:true})
      this.props.setProgress(30)
      let data = await fetch(url)
      this.props.setProgress(70)
      let parsed = await data.json()
      this.setState({loading:false})
      this.setState({articles:parsed.articles,
        total: parsed.totalResults,
        loading:false
      })
      this.props.setProgress(100)
    }
    async componentDidMount(){
      this.update()
    }
    handleprev = async () =>{
      
      this.setState({
        page:this.state.page - 1,
        
        
      })
      this.update()

    }
    handlenext = async () =>{
      
      
      this.setState({
        page:this.state.page + 1,
        
      })
      this.update()
    

    }
    fetchMoreData = async ()=>{
      this.setState({page:this.state.page + 1})
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ef4e811e0aaf4e9cadf2592b0a8fc273&page=${this.state.page}&pageSize=${this.props.pagesize}`
      
      let data = await fetch(url)
      let parsed = await data.json()
      this.setState({loading:false})
      this.setState({articles:this.state.articles.concat(parsed.articles),
        total: parsed.totalResults,
        
      })
    }
  render() {
    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey- Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.total}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((ele)=>{
            return  <div className="col-md-4" key={ele.url}>
            <NewsItem   title={ele.title?ele.title.slice(0,45):""} desc={ele.description?ele.description.slice(0,88):""} imageurl={ele.urlToImage} newsurl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
        </div>
          })}

           
            
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-success" disabled={this.state.page<=1} onClick={this.handleprev}> &larr; Previous </button>
        <button type="button" className="btn btn-success" disabled={this.state.page + 1 > Math.ceil(this.state.total / this.props.pagesize)} onClick={this.handlenext}>Next &rarr;</button>


        </div> */}
      </>
    )
  }
}

export default News