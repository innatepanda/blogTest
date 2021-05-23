import React, {Component} from 'react'
import {Container} from 'reactstrap'
import ArticleCard from "../../../component/ArticleCard/ArticleCard"
import firebase from "../../../component/Config/firebase"

const db=firebase.firestore();
class Main extends Component{
    constructor(props)
    {
        super(props)
        {
            this.state={
                isLoaded:false,
                articles:[],


            }
        }
    }

    componentDidMount(){
        this.getArt();
    }


        getArt=()=>{
            db.collection("posts")
            .orderBy("Created", "desc").limit(8).get().then(docs=>{
                let art=[];
                docs.forEach(function(doc){
                    const article={
                        id:doc.id,
                        ...doc.data()
                    }
                    art.push(article);
                })
                this.setState({
                    articles:art
                }, ()=>{
                    this.setState({
                        isLoaded: true
                    })
                })
            })
        }
    render(){
        return(
            <div>
                <Container>
                 {  
                    this.state.isLoaded?                     
                    this.state.articles.map((article, index)=>{
                        return (
                            <ArticleCard 
                            key={index}
                            data={article}/>

                        )
                    }) :" "
                }  
                </Container>
                

                
            </div>
        )
    }
}

export default Main;