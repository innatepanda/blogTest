import React, {Component} from 'react'

import firebase from "../../../component/Config/firebase"


import {Link} from 'react-router-dom'

const db=firebase.firestore();

class Main extends Component{
    constructor(props)
    {
        
        super(props)
        
            this.state={
                isLoaded:false,
                articles:[],
                article:{},
                prop:props
                


            }
        
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.today.getFullYear();

        this.today = yyyy + '-' + mm + '-' + dd;
        
        
    }

    componentDidMount(){
        this.getArt();
    }


        getArt=()=>{
            
            var p=this.state.prop.auth
            db.collection("posts").where("Created", "<=",this.today )
            .orderBy("Created", "desc").limit(2).get().then(docs=>{
                let art=[];
                docs.forEach(function(doc){
                    const article={
                        id:doc.id,
                        auth:p,
                        ...doc.data()
                    }
                    art.push(article);
                })
                this.setState({
                    articles:art
                }, ()=>{
                    console.log(this.state.articles)
                    this.setState({
                        isLoaded: true
                    })
                })
            })
        }
    render(){
        return(
            <div div className="user-main">
                       <div>
                    <div className="article-title"><b>XoRphilic</b></div><div className="description">By default, a background-image is placed at the top-left corner of an element, and repeated both vertically and horizontally.</div><br /><br />
                    <Link to={{pathname:'/allArticles', state:{article:this.state.data}}}> View All </Link>
                   

                    
                    </div>
                <div className="user-content">
                 {  
                    this.state.isLoaded?                     
                    this.state.articles.map((article, index)=>{
                       
                        return (
                            <div>
                                          <div className="each-article">
                                    <div className="side-number">{index+1}</div>
                                        <div >
                        
                        
                                <h5 >
                                    {article.Title}
                                </h5>
                        
                                <hr />
                                <div className="small-text-purple">{article.Category}</div>
                            <h6>
                        
                            <p className="small-text">
                            {article.Summary}
                            </p>

                            </h6>
                        
                                    <button onClick={()=>{
                                        this.props.history.push('/article/'  +article.id+'/'+article.Title)
                                    }}>Read More</button>



                            </div>
                                
                        </div>
                                
                            </div>
                            
                           
                        )
                    }) :" "
                }  
                </div>
                

                
            </div>
        )
    }
}

export default Main;