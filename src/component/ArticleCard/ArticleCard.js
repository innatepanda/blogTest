import React, { Component } from 'react'
import {Card, CardBody, CardFooter, Jumbotron, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import classes from './ArticleCard.module.css'
import firebase from '../../../src/component/Config/firebase'
import { render } from '@testing-library/react'


const db=firebase.firestore();
let p

  
class ArticleCard extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            things:{
            Title:this.props.data.Title,
            artauth:'',
            Author:this.props.data.Author,
            Summary:this.props.data.Summary,
            Created:this.props.data.Created,
            id:this.props.data.id,
            loaded:false,
            auth:this.props.data.auth,
            Content: this.props.data.Content,
            Category: this.props.data.Category,
            Youtube: this.props.data.Youtube

            },
            
            
            
        }
        this.getauth()
    }
    getauth(){
    
    
        db.collection("users").doc(this.state.things.Author).get().then(
            doc=>{
                
                this.setState({
                    things:{
                        ...this.state.things,
                        artauth:doc.data().name,
                        loaded:true
                    }
                })
                
            }
           
    
        )
            
    
        }
    render(){
        
        if(!this.state.things.loaded){
            return ("");
        }
           
            return(
                <Card className={classes.card}>
                    
                    
                    <h5 className={classes.cardtitle}>
                        {this.state.things.Title}
                    </h5>
                    <hr />
                     
                    <h6>
                    <b>{this.state.things.Created.split("-")[2]}-{this.state.things.Created.split("-")[1]}-{this.state.things.Created.split("-")[0]}</b> by <b>{this.state.things.artauth}</b>
                        <p>
                        {this.state.things.Summary}
                        </p>

                    </h6>
                    <Link to={{pathname:'/article/'  +this.state.things.id+'/'+this.state.things.Title, state:{article:this.state.things}}}> Go </Link>
                    
                    {
                                    !this.state.things.auth.isEmpty?

                                    <Link to={{pathname:'/iJ6hjvpfuivhi0pioubxjovbbdYVyfgv/edit-article' , state:{
                                        article:this.state.things
                                        
                                    }}}> Edit </Link>
                                    :''

                                }
               
                

                </Card>
    
                
                );
    

        }
        
        
    }
    


export default ArticleCard
