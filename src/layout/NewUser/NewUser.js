
import React, {Component} from 'react'
import {Container, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap'
import firebase from 'firebase'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const db=firebase.firestore()

class NewUser extends Component{
    constructor(props){
        super(props);
        
        this.state={
            newUser:{
                name:'',
                email:'',
                desc:'',
                github:"null"
            },
           
        }
        
    }
    

      onChangename=(value)=>{
        
        
          this.setState({
              newUser:{
                  ...this.state.newUser,
                  name:value,
                  
              }
          })
          
      }

      
    


      
      onChangeYt=(value)=>{
        this.setState({
            newUser:{
                ...this.state.newUser,
                github:value,
            }
            
        })
      }
      onChangeemail=(value)=>{
        this.setState({
            newUser:{
                ...this.state.newUser,
                email:value,
            }
            
        })
      }
      onChangedesc=(value)=>{
        this.setState({
            newUser:{
                ...this.state.newUser,
                desc:value,
            }
            
        })
      }


    submitUser=()=>{
        console.log(this.state.newUser)
        db.collection("users").doc(this.state.newUser.email).set({
            name:this.state.newUser.name,
            desc:this.state.newUser.desc,
            email: this.state.newUser.email,
            github:this.state.newUser.github

        })
        firebase.auth().createUserWithEmailAndPassword(this.state.newUser.email, "123456")
        this.props.history.push('/')


    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xl={9} lg={9} md={8} sm={12} xs={12}>
                            <h2>Create New</h2>
                            <FormGroup>
                                <Label>name</Label>
                                <Input type='text' name='newname' id='newname' 
                                onChange={(el)=>this.onChangename(el.target.value) }
                                value={this.state.newUser.name}/>
                                {this.state.t}
                            </FormGroup>
                            <FormGroup>
                                <Label>email</Label>
                                <Input type='text' name='newcat' id='newcat'
                                onChange={(el)=>this.onChangeemail(el.target.value)}
                                value={this.state.newUser.email}/>
                                
                            </FormGroup>
                            
                            
                            <FormGroup>
                                <Label>github Link</Label>
                                <Input type='text' name='newyt' id='newyt'
                                onChange={(el)=>this.onChangeYt(el.target.value)}
                                value={this.state.newUser.github}/>
                                
                            </FormGroup>
                            <FormGroup>
                                <ReactQuill 
                                ref={(el)=>this.quill=el}
                                value={this.state.newUser.desc}
                                onChange={(el)=>this.onChangedesc(el)}
                                theme='snow'
                                formats={this.formats}
                                modules={this.modules}
                                />
                                Note: select text then click on link, select text then click on clean format (tx sorta symbol)
                                Note: first code is codeblock next is inline code
                            </FormGroup>

                        </Col>
                        <Col xl={3} lg={3} md={8} sm={12} xs={12}>
                            
                            <Button onClick={(e)=>this.submitUser()}>Click me</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default NewUser