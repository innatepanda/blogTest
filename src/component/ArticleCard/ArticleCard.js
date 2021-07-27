import React, { Component } from 'react'
import {Card} from 'reactstrap'
import {Link} from 'react-router-dom'
import classes from './ArticleCard.module.css'
import firebase from '../../../src/component/Config/firebase'



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
            AuthorName:this.props.data.AuthorName,
            Summary:this.props.data.Summary,
            Created:this.props.data.Created,
            id:this.props.data.id,
            
            auth:this.props.data.auth,
            Content: this.props.data.Content,
            Category: this.props.data.Category,
            Youtube: this.props.data.Youtube

            },
            
            
            
        }
    
    }

    

    render(){
        
        
           
            return(
                <Card className={classes.card}>
                    
                    
                    <h5 className={classes.cardtitle}>
                        {this.state.things.Title}
                    </h5>
                    <hr />
                     
                    <h6>
                    <b>{this.state.things.Created.split("-")[2]}-{this.state.things.Created.split("-")[1]}-{this.state.things.Created.split("-")[0]}</b> by <b>{this.state.things.AuthorName}</b>
                        <p>
                        {this.state.things.Summary}
                        </p>

                    </h6>
                    <Link to={{pathname:'/article/'  +this.state.things.id+'/'+this.state.things.Title, state:{article:this.state.things}}}> Go </Link>
                    
                    {
                                    this.state.things.auth.uid==this.state.things.Author?

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
