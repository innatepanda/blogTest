import React, {Component} from 'react'
import classes from './ViewArticle.module.css'
import parse from 'html-react-parser';
import {withRouter} from 'react-router-dom'
import {Container} from 'reactstrap'
import firebase from '../../../src/component/Config/firebase'
import YouTubePlayer from 'react-player/youtube';

const db=firebase.firestore();
class ViewArticle extends Component{
    constructor(props){
        super(props);
        this.state={
            article:{},
            loaded:false,
        }
        
    
    }

        componentDidMount(){
            if(typeof this.props.location.state!=='undefined')
           { 
               
               this.setState(
                {
                    article: this.props.location.state.article
                }
            , ()=>{
                this.setState(
                    {
                        loaded:true
                    }
                )

            }
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
        
           return(
            <div>
                <YouTubePlayer  url={a.Youtube}/>
      
                <div>
                {parse(a.Title)}
                </div>
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