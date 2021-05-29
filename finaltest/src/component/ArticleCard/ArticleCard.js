import React, { Component } from 'react'
import { Jumbotron, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import classes from './ArticleCard.module.css'
import firebase from '../../../src/component/Config/firebase'
import { render } from '@testing-library/react'


const db=firebase.firestore();
let p

  
class ArticleCard extends Component{
    constructor(props){
        super(props);
        this.state={
            things:{
            Title:this.props.data.Title,
            artauth:'',
            Author:this.props.data.Author,
            Summary:this.props.data.Summary,
            Created:this.props.data.Created,
            id:this.props.data.id,
            loaded:false,

            },
            
            
            
        }
        this.getauth()
    }
    getauth(){
    
    
        db.collection("users").doc(this.state.things.Author).get().then(
            doc=>{
                console.log(doc.data().name)
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
        console.log("pr")
        if(!this.state.things.loaded){
            return ("");
        }
           console.log(this.props.data) 
            return(
    
                <Jumbotron className={classes.ArticleCard}>
                    
                    <h3 className={classes.CardTitle}>
                        {this.state.things.Title}
                    </h3>
                    <hr />
                        
                    <h6>
                    <b>{this.state.things.Created.split("-")[2]}-{this.state.things.Created.split("-")[1]}-{this.state.things.Created.split("-")[0]}</b> by <b>{this.state.things.artauth}</b>
                        <p>
                        {this.state.things.Summary}
                        </p>

                    </h6>
                    <Link to={{pathname:'/article/'  +this.state.things.id+'/'+this.state.things.Title, state:{article:this.props.data}}}> Go </Link>
                    
                    
                </Jumbotron>
                
                );
    

        }
        
        
    }
    


export default ArticleCard
