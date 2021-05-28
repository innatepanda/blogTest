import React, {Component} from 'react'
import {Container} from 'reactstrap'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from '../../component/Config/firebase'

const uiConfig={
    signInFlow:'popup',
    signInSuccessUrl :'/',
    signInOptions:[
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
    
}
class Login extends Component{
    constructor(props){
        super(props);
    }

  
    render(){
        console.log(this.props)
        return(
            <Container>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            
            </Container>
        )
    }
}

export default Login