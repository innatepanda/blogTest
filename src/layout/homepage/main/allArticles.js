import React, {Component} from 'react'
import {Container} from 'reactstrap'
import {Link} from 'react-router-dom'
import firebase from "../../../component/Config/firebase"
/*import {button} from 'reactstrap'
import {Link} from 'react-router-dom'
*/
const db=firebase.firestore();
var thispageArticles;
class AllArticles extends Component{
 
    constructor(props)
    {
        
        super(props)
        
            this.state={
                isLoaded:false,
                articles:[],
                article:{},
                perpage:6,
                maxpgs:0,
                pg:0,

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
                    articles:art,
                    maxpgs:Math.ceil(art.length/this.state.perpage)
                }, ()=>{
                    this.setState({
                        isLoaded: true
                    })
                })
            }).catch(err=>console.log(err))
        }
    render(){
        thispageArticles=[];
        var firstIndex=this.state.pg*this.state.perpage;
        var lastIndex=firstIndex+this.state.perpage;
        thispageArticles=this.state.articles.slice(firstIndex, lastIndex);
        console.log(thispageArticles)
        return(
            <div>
                <Container>
                 {  
                    this.state.isLoaded?                     
                    thispageArticles.map((article, index)=>{
                       
                        return (
                            <div>
                                  <div >
                    
                    
                    <h5 >
                        {article.Title}
                    </h5>
                    <hr />
                     
                    <h6>
                    <b>{article.Created.split("-")[2]}-{article.Created.split("-")[1]}-{article.Created.split("-")[0]}</b> by <b>{article.AuthorName}</b>
                        <p>
                        {article.Summary}
                        </p>

                    </h6>
                    <Link to={{pathname:'/article/'  +article.id+'/'+article.Title, state:{article:article}}}> Go </Link><br />
                    
                    {
                                   firebase.auth().currentUser!==null? firebase.auth().currentUser.uid==article.Author?

                                    <Link to={{pathname:'/iJ6hjvpfuivhi0pioubxjovbbdYVyfgv/edit-article' , state:{
                                        article:article
                                        
                                    }}}> Edit </Link>
                                    :''
                                    :''

                                }
               
                

                </div>
                            <hr />    
                            </div>
                            
                           
                        )
                    }) :" "
                }  
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

                </Container>

                
            </div>
        )
    }
}

export default AllArticles;