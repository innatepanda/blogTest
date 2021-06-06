import React, {Component} from 'react'
import {Container} from 'reactstrap'
import ArticleCard from "../../../component/ArticleCard/ArticleCard"
import firebase from "../../../component/Config/firebase"
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
const db=firebase.firestore();
var today;
class AllArticles extends Component{
 
    constructor(props)
    {
        
        super(props)
        {
            this.state={
                isLoaded:false,
                articles:[],
                article:{}


            }
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
            db.collection("posts").where("Created", "<=",this.today )
            .orderBy("Created", "desc").get().then(docs=>{
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
                            <div>
                                <ArticleCard 
                                key={index}
                                data={article}/>
                                


                                 
                                {
                                    !this.props.auth.isEmpty?

                                    <Link to={{pathname:'/iJ6hjvpfuivhi0pioubxjovbbdYVyfgv/edit-article' , state:{
                                        article:article
                                        
                                    }}}> Edit </Link>
                                    :''

                                }

                                

                                
                            </div>
                            
                           
                        )
                    }) :" "
                }  
                </Container>
                

                
            </div>
        )
    }
}

export default AllArticles;