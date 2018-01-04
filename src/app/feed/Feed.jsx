/**
 * @overview Feed page. Downloads and renders posts in a list.
 */
import React, {Component} from 'react';

import {getPosts} from '../../api'


class Feed extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentWillMount(){
        /* Usually I would prefer to put result in redux and map state to props, but this is without redux... */
        const posts = getPosts().then(r=>this.setState({posts:r}));

    }

    sortPosts = posts =>{
        /* here a library like lodash would probably be better but lets keep the project less bloated. */
        posts.sort((a,b)=>{
            return new Date(b.publish_date) - new Date(a.publish_date);
        })
    }

    render(){
        console.log(this)
        const {posts} = this.state;
        if(!posts)
        return <div />
        this.sortPosts(posts);
        return(
            <ul style={{ listStyle:'none' }}>
            {posts.map(e=>(
                <li 
                    className='feed-list-item'
                    key={`list_key_${e.id}`}>
                    <a href={`/${e.slug}`}>
                    <div>
                        <h3>{e.title}</h3>
                        <small>{e.author}</small>
                        <p>{e.description}</p>
                    </div>
                    </a>
                </li>
            ))}
            </ul>
        );
    }
}
export default Feed;