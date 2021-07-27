import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom'
import Main from "../homepage/main/Main"
import ViewArticle from "../ViewArticle/ViewArticle"
import NewArticle from "../NewArticle/NewArticle"
import EditArticle from "../EditArticle/EditArticle"
import AllArticles from "../homepage/main/allArticles"
import Login from '../login/login'
import ErrorModal from '../../component/ErrorModal/ErrorModal'
import {connect} from 'react-redux'
import Heading from "../homepage/heading/Heading"
import UserProfile from '../NewUser/UserProfile'
import ChangeProfile from '../NewUser/ChangeProfile'
import LinkSent from './LinkSent'


const enhance=connect(
  ({firebase:{auth, profile}})=>({
      auth, profile
  })
)
class RouterManager extends Component{
    constructor(props)
    {
        super(props)
        
        
        this.modalref=React.createRef()
    }
    render(){
        if(this.props.auth.isLoaded )
        {
            var pr={
                color:'red',
                open:false,
                msg:'dummy'
            }
            return(    
                <div>
                    <ErrorModal ref={this.modalref} content={pr}/>
                
                            <div>
                                <Heading {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>     
                                <Switch>
                                    <Route path="/" exact>
                                        <Main {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/article/:id" >
                                        <ViewArticle showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/iJ6hjvpfuivhi0pvikbshvYVyfgv/new-article" exact>
                                    <NewArticle {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    
                                    <Route path="/iJ6hjvpfuivhi0pioubxjovbbdYVyfgv/edit-article" exact>
                                    <EditArticle {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/login" >
                                        <Login {...this.props}showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/allArticles" >
                                        <AllArticles {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/user-profile/:id/:name" >
                                        <UserProfile showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/change-settings" >
                                        <ChangeProfile {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/link-sent" >
                                        <LinkSent/>
                                    </Route>
                                    <Route path="*" >
                                        <Main/>
                                    </Route>
                            </Switch>
                        </div>      
            
    
                </div>
            )
              

        }
        else
            return null 
        
        
    }
}


export default enhance(withRouter(RouterManager))