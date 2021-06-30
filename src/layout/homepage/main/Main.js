import React, {Component} from 'react'
import {Container} from 'reactstrap'
import ArticleCard from "../../../component/ArticleCard/ArticleCard"
import firebase from "../../../component/Config/firebase"

import classes from './Main.module.css'
import {Link} from 'react-router-dom'

const db=firebase.firestore();
var today;
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
            .orderBy("Created", "desc").limit(4).get().then(docs=>{
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
            <div className={classes.body}>
                <h1 className={classes.title}>BLOG</h1>
                <Container className={classes.main}>
                 {  
                    this.state.isLoaded?                     
                    this.state.articles.map((article, index)=>{
                       
                        return (
                            <div>
                                <ArticleCard 
                                key={index}
                                data={article}/>
                                
                            </div>
                            
                           
                        )
                    }) :" "
                }  
                </Container>
                <Link to={{pathname:'/allArticles', state:{article:this.state.data}}}> View All </Link>

                
            </div>
        )
    }
}

export default Main;