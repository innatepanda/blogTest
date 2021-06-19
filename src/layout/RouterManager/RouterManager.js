import React, { Component } from 'react';
import { BrowserRouter as Router , Switch, Route, withRouter} from 'react-router-dom'
import Main from "../homepage/main/Main"
import ViewArticle from "../ViewArticle/ViewArticle"
import NewArticle from "../NewArticle/NewArticle"
import EditArticle from "../EditArticle/EditArticle"
import AllArticles from "../homepage/main/allArticles"
import Login from '../login/login'

import {connect} from 'react-redux'
import Heading from "../homepage/heading/Heading"
import UserProfile from '../NewUser/UserProfile'
import ChangeProfile from '../NewUser/ChangeProfile'
import LinkSent from './LinkSent'
import firebase from 'firebase'

const enhance=connect(
  ({firebase:{auth, profile}})=>({
      auth, profile
  })
)
class RouterManager extends Component{
    constructor(props)
    {
        super(props)
        
        this.state={

        }
    }
    render(){
        if(this.props.auth.isLoaded )
        {
            return(    
                <div>
                
                            <div>
                                <Heading {...this.props}/>     
                                <Switch>
                                    <Route path="/" exact>
                                        <Main {...this.props}/>
                                    </Route>
                                    <Route path="/article/:id" >
                                        <ViewArticle />
                                    </Route>
                                    <Route path="/iJ6hjvpfuivhi0pvikbshvYVyfgv/new-article" exact>
                                    <NewArticle {...this.props}/>
                                    </Route>
                                    
                                    <Route path="/iJ6hjvpfuivhi0pioubxjovbbdYVyfgv/edit-article" exact>
                                    <EditArticle {...this.props}/>
                                    </Route>
                                    <Route path="/login" >
                                        <Login {...this.props}/>
                                    </Route>
                                    <Route path="/allArticles" >
                                        <AllArticles {...this.props}/>
                                    </Route>
                                    <Route path="/user-profile/:id" >
                                        <UserProfile/>
                                    </Route>
                                    <Route path="/change-settings" >
                                        <ChangeProfile {...this.props}/>
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