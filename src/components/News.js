import React, { Component } from "react";
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import NewsItem from "./NewsItem";

export class News extends Component {
    static defaultProps = {
        country:"in",
        pageSize:5,
        category:"general",
    }
    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }
  async componentDidMount(){
    this.setState({loading:true})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5f4933f65a140549ad7d549b994db6f&page=1&pageSize=${this.props.pageSize}`
    await fetch(url).then((res) => res.json())
                .then((json) => {
                    this.setState({
                        articles: json.articles,
                        loading: false,
                        totalResults:json.totalResults
                    });
                })
  }
    handleNextClick = async()=>{
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){}
    else{
        this.setState({loading:true})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5f4933f65a140549ad7d549b994db6f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        await fetch(url).then((res) => res.json())
                    .then((json) => {
                        this.setState({
                            articles: json.articles,
                            page:this.state.page+1,
                            loading: false,
                        });
                    })
        }
  } 
  handlePreviousClick = async()=>{
    this.setState({loading:true})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5f4933f65a140549ad7d549b994db6f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    await fetch(url).then((res) => res.json())
                .then((json) => {
                    this.setState({
                        articles: json.articles,
                        page:this.state.page-1,
                        loading: false,
                    });
                })
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">News Monk - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element,index)=>{
                    return <div className="col-sm-6 col-md-6 col-lg-4" key={index} >
                    <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    />
                </div> 
            })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-secondary" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
