import React, {Component} from 'react'

import parse from 'html-react-parser';
import {withRouter} from 'react-router-dom'
import {Container} from 'reactstrap'
import firebase from '../../../src/component/Config/firebase'
import ArticleCard from '../../component/ArticleCard/ArticleCard'
import {Link} from 'react-router-dom'

const db=firebase.firestore();
class ViewArticle extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            author:'',
            loaded:false,
            articles:[],
            auth:''
        }
        
    }

        componentDidMount(){
            if(typeof this.props.location.state!=='undefined')
           { 
               
               
            this.setState(
                {
                    
                    author:this.props.location.state.author.artauth,
                    auth: this.props.location.state.author.auth
                },
                ()=> {
                   
                    this.getp()
                }
            )
        
            
            
        }
        else{
            
            this.getById(this.props.match.params.id);
        }

        }


    getById=(aid)=>{
        console.log(aid)
        db.collection("users").doc(aid).get().then(doc=>{
            if(doc.exists)
            {
                this.setState({
                   author: doc.data()
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


    getposts= async ()=>{
        let art=[]
        

                db.collection("posts")
                .where("Author", "==", this.state.author.authemail).limit(3).get().then(
                    docs=>{
                        var n=this.state.author.name
                        docs.forEach(function(doc){
                            const article={
                                id:doc.id,
                               name: n,
                              
                                ...doc.data()
                            }
                            console.log(article)
                            art.push(article)
                        })

                        }
                        
                    
                ).finally(()=>{
                    this.setState({
                        articles:art,
                        loaded: true
                    }, ()=>{
                        console.log(this.state.articles)
                        console.log("art loaded")
                       
    
                    }) 
                })

                
    }

    getp=async()=>{
        let v=await this.getposts()
    }
    render(){
        if(this.state.loaded)
       { var a=this.state.author
        
           return(
            <div>
                
                {a.name}
                <div>
                {a.desc}
               

                </div>
                <div>
                    <hr/>
                {  
                                      
                    this.state.articles.map(( article)=>{
                        var things={
                            
                            auth :this.state.auth,
                            ...article

                        }
                        return (
                            <div>
                                <h5>{article.Title}</h5>
                                <div>{article.Summary}</div>
                                <Link to={{pathname:'/article/'  +article.id+'/'+article.Title, state:{article:things}}}> Go </Link>
                                <hr/>
                            </div>
                        )
                    }) 
                }  
                </div>
                
                
                
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