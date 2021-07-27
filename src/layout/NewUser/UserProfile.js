import React, {Component} from 'react'

import parse from 'html-react-parser';
import {withRouter} from 'react-router-dom'

import firebase from '../../../src/component/Config/firebase'

import {Link} from 'react-router-dom'
var thispageArticles;
const db=firebase.firestore();
class ViewArticle extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            author:'',
            loaded:false,
            articles:[],
            auth:'',
            perpage:4,
            maxpgs:0,
            pg:0,
        }
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.today.getFullYear();

        this.today = yyyy + '-' + mm + '-' + dd;
        this.getById(this.props.match.params.id);
        
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
               
                this.getp()
                
            }
            else
            {
                
                this.props.history.push({pathname:'/'})
            }
        } )
        
    }


    getposts= async ()=>{
        let art=[]
        console.log(this.props.match.params.id)
        var id=this.props.match.params.id
              await  db.collection("posts")
              .where("Created", "<=",this.today )
              .orderBy("Created", "desc").get().then(
                    docs=>{
                       
                        var n=this.state.author.name
                        docs.forEach(function(doc){
                            
                            if(doc.data().Author==id)
                            {
                                const article={
                                    id:doc.id,
                                   name: n,
                                  
                                    ...doc.data()
                                }
                                console.log(article)
                                art.push(article)
                            }
                            
                        })

                        }
                        
                    
                ).finally(()=>{
                    this.setState({
                        articles:art,
                        loaded: true
                    }, ()=>{
                        
                        console.log("art loaded")
                       
    
                    }) 
                })

                
    }

    getp=async()=>{
        await this.getposts()
    }
    render(){
        
        if(this.state.loaded)
       { var a=this.state.author
        thispageArticles=[];
        var firstIndex=this.state.pg*this.state.perpage;
        var lastIndex=firstIndex+this.state.perpage;
        thispageArticles=this.state.articles.slice(firstIndex, lastIndex);
        
           return(
            <div>
                
                {a.name}<br /><a href={a.github} target="_blank" rel="noreferrer">Github</a>
                <div>
                {parse(a.desc)}
               

                </div>
                <div>
                    <hr/>
                {  
                                      
                    thispageArticles.map(( article)=>{
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
                <div className="btns">
                    {
                        this.state.pg===0?
                        <button color="info" className="button" disabled>prev</button>:
                        <button color="info" className="button" onClick={()=>{
                            this.setState({
                            pg:this.state.pg-1
                            }, ()=>{
                                
                            //window.history.replaceState(thispageArticles, "Articles", "/Articles/"+(this.state.pg+1))

                            })
                        }}>prev</button>
                        }
                        pg-{this.state.pg+1}
                        {
                        this.state.pg===this.state.maxpgs-1 ?
                        <button color="info" disabled className="button">next</button>:
                        <button color="info" className="button" onClick={()=>{
                            this.setState({
                            pg:this.state.pg+1
                            }, ()=>{
                            //window.history.replaceState(thispageArticles, "Articles", "/Articles/"+(this.state.pg+1))
                            })
                        }}>next</button>
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