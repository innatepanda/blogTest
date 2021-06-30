import React, {Component} from 'react'
import {Container} from 'reactstrap'
import ArticleCard from "../../../component/ArticleCard/ArticleCard"
import firebase from "../../../component/Config/firebase"
/*import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
*/
const db=firebase.firestore();

class AllArticles extends Component{
 
    constructor(props)
    {
        
        super(props)
        
            this.state={
                isLoaded:false,
                articles:[],
                article:{}


            }
        console.log(props);
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
            var p=this.props.auth
            db.collection("posts").where("Created", "<=",this.today )
            .orderBy("Created", "desc").get().then(docs=>{
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