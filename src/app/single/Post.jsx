/**
 * @overview Single post page
 */
import React, {Component} from 'react';
import {getPostById,getPostCommnets,addNewComment} from '../../api'

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {formsValues:{}};
    }

    componentWillMount(){
        const id = this.props.params && this.props.params.id ? this.props.params.id : '-1';
        getPostById(id).then(r=>this.setState({post:r}));
        getPostCommnets(id).then(r=>this.setState({comments:r}));

    }

    renderCommentChildren = (comment, all) =>{
        const {id} = comment;
        const children = all.filter(e=>{
            return e.parent_id === id;
        })
        return children.map(e=>{
            return this.renderSingleComment(e, all);
        });
    }

    renderSingleComment = (comment, all) =>{
        return(
            <div 
            style={{marginLeft: comment.parent_id ? '20px' : 0}}
            className='single-comment'
            key={`single_comment_key_${comment.id}`}>
                <span>{comment.user}</span>
                <div>
                    {comment.content}
                </div>
                {this.renderCommentChildren(comment, all)}
            </div>
        );
    }

    renderComments = _comments =>{
        const comments = [..._comments];
        comments.sort((a,b)=>{
            return new Date(b.date) - new Date(a.date);
        })
        const parents = comments.filter(e=>{
            return !e.parent_id;
        })
        return(
            parents.map(e=>{
                return(this.renderSingleComment(e, comments));   
            })
        );
    }

    saveValues = key => (event) =>{
        const {formsValues} = this.state;
        formsValues[key]=event.target.value;
        this.setState({formsValues});
    }
    postNewComment = (event) =>{
        event.preventDefault();
        const _date = new Date();
        const date = `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
        const data = {
            user: this.state.formsValues.name,
            content: this.state.formsValues.content,
            date,
        }
        addNewComment(this.state.post.id, data)
        .then(r=>{
            const {comments} = this.state;
            comments.push(r)
            if(r)this.setState({comments, formsValues:{}})
        });
    }

    renderNewComment = () =>{
        const {formsValues: values} = this.state;
        return(
            <div>
            <h4>Comment:</h4>
                <form
                    onSubmit={this.postNewComment}
                >
                    <label htmlFor='nc_name'>Name:</label>
                    <input 
                        onChange={this.saveValues('name')}
                        type='text' 
                        id='nc_name' 
                        value={values.name || ''} 
                        />
                    <label htmlFor='nc_name'>Content:</label>
                    <textarea 
                        type='text' 
                        id='nc_content'
                        onChange={this.saveValues('content')}
                        value={values.content || ''} 
                        />
                    <input type='submit' value="Submit" />
                </form>
            </div>
        );
    }

    render(){
        const {post, comments} = this.state;
        if(!post)return <div />
        return (
            <div>
                <article>
                    <h1>{post.title}</h1>
                    <div className='post-details'>
                        <small>{post.publish_date}</small>
                        <span>{post.author}</span>
                    </div>
                    <div 
                        className='post-content'
                        dangerouslySetInnerHTML={{__html: post.content}}/>
                </article>
                <section className='post-comments'>
                    {this.renderNewComment()}
                    {comments && comments.length && comments.length > 0 ? this.renderComments(comments) : <div />}
                </section>
            </div>
        );
    }
}
export default Post;
