import React, {Component} from 'react'
import {Container,FormGroup, Label, Input, Button} from 'reactstrap'
import firebase from '../../component/Config/firebase'
//import  { Redirect } from 'react-router-dom'

//var email, password;
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            res:{
                email:'',
            password:'',
            response:''

            }
            
        }
    }
    
    
     
    onChangeEm=(value)=>{
        this.setState({
            res:{
                ...this.state.res,
                email:value,
            }
        })
      }
      onChangePw=(value)=>{
          console.log(value)
        this.setState({
            res:{
                ...this.state.res,
                password:value,
            }
        })
      }
     
      submitEm=async()=>{
         await firebase.auth()
          .signInWithEmailAndPassword(this.state.res.email, this.state.res.password).then((user)=>{console.log(user)
            this.props.history.push('/')}).catch((error)=>{
                this.props.history.push('/')
          });
        
    }
    resetPw(){
        firebase.auth().sendPasswordResetEmail(
            this.state.res.email, null)
            .then(function() {
                this.props.history.push('/link-sent')}).catch((error)=>{
                    this.props.history.push('/link-sent')
            })
            .catch(function(error) {
              console.log(error)
            });
    }
        

    

  
    render(){
        
        return(
            <Container>
               <FormGroup>
                                <Label>Email</Label>
                                <Input type='text' name='newem' id='newem'
                                onChange={(el)=>this.onChangeEm(el.target.value)}
                                value={this.state.res.email}/>
                                
                            </FormGroup>
                            <FormGroup>
                                <Label>Pw</Label>
                                <Input type='text' name='newpw' id='newpw'
                                onChange={(el)=>this.onChangePw(el.target.value)}
                                value={this.state.res.password}/>
                                
                            </FormGroup>
                            <Button onClick={(e)=>this.submitEm()}>Login</Button>
                            <Button onClick={(e)=>this.resetPw()}>Reset pw</Button>
            
            </Container>
        )
    }
}

export default Login