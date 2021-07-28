import React, {Component} from 'react'

import parse from 'html-react-parser';
import {withRouter} from 'react-router-dom'

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
            artauth:'',
            
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
        
       var art={
            artauth:this.state.artauth,
            auth:this.state.auth
        }
        console.log(art)
        var a=this.state.article
        
            return(
            <div>
                {
                   firebase.auth().currentUser!==null?firebase.auth().currentUser.uid===this.state.article.Author?
                    <div>
                            <Link to={{pathname:'/iJ6hjvpfuivhi0pioubxjovbbdYVyfgv/edit-article' , state:{article:this.state.article}}}> Edit </Link>
                            <button onClick={()=>{
                                db.collection("posts").doc(this.state.article.id).delete().then(() => {
                                    console.log("Document successfully deleted!");
                                    this.props.history.push("/")
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                });
                            }}>delete</button>
                    </div>
            
                    
                    :''
                    :''

                }
                
                <YouTubePlayer  url={a.Youtube}/>
      
                <div><b>{parse(a.Title)}</b></div>
                
                {
                    
                        <Link to={{pathname:'/user-profile/'+this.state.article.Author+'/'+art.artauth.name +'/', state:{author: art}}}> {art.artauth.name} </Link>
                    
                   

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