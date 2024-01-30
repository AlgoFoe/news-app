import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl } = this.props;
  
    return (
      <div className="my-3">
        <div
          className="card"
          style={{
            width: "16rem",
            height: "20rem",
            overflowY: "hidden",
            paddingBottom: "5px",
          }}
        >
          <img
            src={
              imgUrl === null
                ? "https://www.sportsvalue.com.br/wp-content/themes/sportsvalue/consultix/images/no-image-found-360x250.png"
                : imgUrl
            }
            onError={(event) => {
              event.target.src = "https://www.sportsvalue.com.br/wp-content/themes/sportsvalue/consultix/images/no-image-found-360x250.png";
              event.onerror = null;
            }}
            style={{ maxHeight: "180px", objectFit: "cover" }}
            className="card-img-top"
            alt="img"
          />
          <div
            className="card-body"
            style={{
              maxHeight: "12rem",
              overflowY: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <style>
              {`
                .card-body::-webkit-scrollbar {
                  width: 0.2rem; /* adjust the width as needed */
                }

                .card-body::-webkit-scrollbar-thumb {
                  background-color: transparent; /* hide the thumb */
                }

                .card-body::-webkit-scrollbar-track {
                  background-color: transparent; /* hide the track */
                }
              `}
            </style>
            <h5 className="card-title">
              {title === "[Removed]" ? "Null title" : title}
            </h5>
            <p className="card-text">
              {description === "[Removed]" || description === null
                ? "Null description"
                : description}
            </p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
