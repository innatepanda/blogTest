import React, {Component} from 'react'
import classes from './ViewArticle.module.css'
import parse from 'html-react-parser';
import {withRouter} from 'react-router-dom'
import {Container} from 'reactstrap'
import firebase from '../../../src/component/Config/firebase'
import YouTubePlayer from 'react-player/youtube';
import {Link} from 'react-router-dom'

const db=firebase.firestore();
class ViewArticle extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            article:{},
            loaded:false,
            auth:'',
            artauth:''
        }
        
    }

        componentDidMount(){
            if(typeof this.props.location.state!=='undefined')
           { 
               
               
            this.setState(
                {
                    article: this.props.location.state.article,
                    auth:this.props.location.state.article.auth,
                    loaded: true
               
                       

                },
                ()=> this.getauth()
            )
        
            
            
        }
        else{
            console.log(this.props)
            console.log(this.props.match.params.id)
            this.getById(this.props.match.params.id);
        }

        }

        getauth(){
    
    
            db.collection("users").doc(this.state.article.Author).get().then(
                doc=>{
                    
                    this.setState({
                        
                            artauth:doc.data(),
                            
                    })
                    
                }
               
        
            )
            console.log(this.state.artauth)
                
        
            }
    getById=(aid)=>{
        
        db.collection("posts").doc(aid).get().then(doc=>{
            if(doc.exists)
            {
                this.setState({
                    article: doc.data()
                }, ()=>{
                    this.setState(
                        {
                            loaded:true
                        }
                    )
    
                })
                this.getauth()
            }
            else
            {
                
                this.props.history.push({pathname:'/'})
            }
        } )
    }
    render(){
        if(this.state.loaded)
       { 
        
        this.state.artauth={
            artauth:this.state.artauth,
            auth:this.state.auth
        }
        var a=this.state.article
        console.log(a)
           return(
            <div>
                {
                    !this.state.auth.isEmpty?
                    
                        <Link to={{pathname:'/iJ6hjvpfuivhi0pioubxjovbbdYVyfgv/edit-article' , state:{article:this.state.article}}}> Edit </Link>
                    
                    :''

                }
                
                <YouTubePlayer  url={a.Youtube}/>
      
                <div>{parse(a.Title)}</div>
                
                {
                    
                        <Link to={{pathname:'/user-profile/'+this.state.artauth.artauth.name +'/', state:{author: this.state.artauth}}}> {this.state.artauth.artauth.name} </Link>
                    
                   

                }
                
                {parse(a.Content)}
                
                
            </div>
        )
       }
       else{
           return(
               <div>
                   loading..
               </div>
           )
       }
    }
}

export default withRouter(ViewArticle)