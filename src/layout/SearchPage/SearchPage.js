import React, {Component} from 'react'
import {Container} from 'reactstrap'
import {Link} from 'react-router-dom'
import firebase from "../../component/Config/firebase"
/*import {button} from 'reactstrap'
import {Link} from 'react-router-dom'
*/
const db=firebase.firestore();
var thispageArticles;
var s
var isLoaded=false
                var articles=[]
                
                var perpage=3
               var  maxpgs=0
                var pg=0
                var searchkeyword=''
class SearchPage extends Component{
 
    constructor(props)
    {
        
        super(props)
        
            this.state={
                pg:0
            }
            

            
        console.log(props)
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.today.getFullYear();

        this.today = yyyy + '-' + mm + '-' + dd;
        var st=props.word
        
            thispageArticles=[{title:"abc"},];
            this.getArt(st)
        
    }

    shouldComponentUpdate(nextprops){
        isLoaded=false
        
        var st=this.props.word
        
        thispageArticles=[{title:"abc"},];
        this.getArt(st)
        
    }
    


        getArt=async (st)=>{
            var p=firebase.auth().currentUser
            
            await db.collection("posts").where("Created", "<=",this.today )
            .orderBy("Created", "desc").get().then(docs=>{
                
                let art=[];
                docs.forEach(function(doc){
                    
                    if(doc.data().Title.toLowerCase().indexOf(st.toLowerCase())>=0 || 
                    doc.data().Content.toLowerCase().indexOf(st.toLowerCase())>=0 ||
                    doc.data().Summary.toLowerCase().indexOf(st.toLowerCase())>=0 ||
                    doc.data().AuthorName.toLowerCase().indexOf(st.toLowerCase())>=0 ||
                    doc.data().Category.toLowerCase().indexOf(st.toLowerCase())>=0)
                    {
                        const article={
                            id:doc.id,
                            auth:p,
                            ...doc.data()
                        }
                        art.push(article);
                    }
                    
                })
                
                    articles=art
                    maxpgs=Math.ceil(art.length/ perpage)
                
                        isLoaded= true
                        
                        this.forceUpdate()
                   
            }).catch((err)=>{console.log(err)})
        }
    render(){
        
        var firstIndex= pg* perpage;
        var lastIndex=firstIndex+ perpage;
        thispageArticles= articles.slice(firstIndex, lastIndex);
        console.log(thispageArticles)
        console.log(isLoaded)
        if(articles.length==0&&isLoaded)
        {
            return(
                <div>
                    no matching searches
                </div>
            )
        }
        
        return(
            <div>
                <Container>
                 {  
                     isLoaded?                     
                    thispageArticles.map((article, index)=>{
                       console.log(article.id)
                        return (
                            <div>
                                  <div >
                    
                    
                    <h5 >
                        {article.Title}
                    </h5>
                    <hr />
                     {article.Category}
                    <h6>
                    <b>{article.Created.split("-")[2]}-{article.Created.split("-")[1]}-{article.Created.split("-")[0]}</b> by <b>{article.AuthorName}</b>
                        <p>
                        {article.Summary}
                        </p>

                    </h6>
                   
                                <button onClick={()=>{
                                    this.props.history.push('/article/'  +article.id+'/'+article.Title)
                                }}>go</button>
               
                

                </div>
                            <hr />    
                            </div>
                            
                           
                        )
                    }) :" "
                }  
                 <div className="btns">
                    {
                         pg===0?
                        <button color="info" className="button" disabled>prev</button>:
                        <button color="info" className="button" onClick={()=>{
                            this.setState({
                            pg: pg-1
                            }, ()=>{
                                
                            //window.history.replaceState(thispageArticles, "Articles", "/Articles/"+( pg+1))
                                pg=pg-1
                            })
                        }}>prev</button>
                        }
                        pg-{ pg+1}
                        {
                         pg=== maxpgs-1 ?
                        <button color="info" disabled className="button">next</button>:
                        <button color="info" className="button" onClick={()=>{
                            this.setState({
                            pg: pg+1
                            }, ()=>{
                            //window.history.replaceState(thispageArticles, "Articles", "/Articles/"+( pg+1))
                            pg=pg+1
                            })
                        }}>next</button>
                        }

                </div>

                </Container>

                
            </div>
        )
    }
}

export default SearchPage;