import React from "react";
import "./Special.css";
import axios from "axios";

const APIKEY = "89cfe00e2a89455d86cebbebd6b4c4df";

class Special extends React.Component {

state = {
  articles: [],
  newsSource: ""
}

/* Special Interest News API Sources
crypto-coins-news
engadget
entertainment-weekly
hacker-news
ign
medical-news-today
mtv-news
national-geographic
new-scientist
next-big-future
polygon
reddit-r-all
t3n
the-verge
vice-news
wired
*/

componentDidMount() {
  this.setState({newsSource: this.props.newsSource})
  // console.log("this.props.newsSource: " + this.props.newsSource);
  this.getNews(this.props);
}

componentWillReceiveProps(nextProps) {
// console.log("nextProps: " , nextProps);
  this.getNews(nextProps);
}

getNews = data => {
  axios.get(`https://newsapi.org/v2/top-headlines?sources=${data.newsSource}&apiKey=${APIKEY}`)
    .then(res => {
      var indexof = JSON.stringify(res).indexOf("[");
      var last = JSON.stringify(res).lastIndexOf('},"status"');
      var newString = JSON.stringify(res).slice(indexof, last);
      var newArray = JSON.parse(newString);
      console.log("newArray: " + newArray)

      this.setState({
        articles: newArray,
        sourceName: newArray[0].source.name
      })
    }
  )
}

  render() {
    console.log("this.state.articles: " + this.state.articles);
    return (
      <div class="card">
        <div class="card-header special-header">
          <h2>Special Interest</h2>
        </div>
        
        <div class="card-body">
        
        <p>{this.state.sourceName}</p>

        {this.state.articles.map((article, index) => {
         if (index < 10) {
          return (
            <div key={article.url}>
              <a class="card-link" target="_blank" href={article.url}>{article.title}</a>
              <br/>
              <br/>
            </div>
          ) 
        }
      })}
      </div>
    </div>  
  )}
};

export default Special;
