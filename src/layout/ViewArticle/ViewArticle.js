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
            auth:''
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
                ()=> console.log(this.state.loaded)
            )
        
            
            
        }
        else{
            console.log(this.props)
            console.log(this.props.match.params.id)
            this.getById(this.props.match.params.id);
        }

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
            }
            else
            {
                
                this.props.history.push({pathname:'/'})
            }
        } )
    }
    render(){
        if(this.state.loaded)
       { var a=this.state.article
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