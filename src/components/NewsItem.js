import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, desc, imageurl, newsurl, author, date, source } = this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: 1 }}>
                        {source}

                    </span>
                    <img src={imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{desc}  </p>
                        <p className="card-text"><small>By {author ? author : "Unknown"} On {new Date(date).toGMTString()}</small></p>
                        <a href={newsurl} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem