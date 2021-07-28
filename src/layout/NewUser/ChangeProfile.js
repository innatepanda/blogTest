
import React, {Component} from 'react'

import {Container , FormGroup, Label, Input, Button} from 'reactstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import firebase from 'firebase'
//import Compressor from 'compressorjs'
/*import Quill from 'quill';

import { ImageResize } from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);*/








var newPassword; var pr;
const db=firebase.firestore();
class ChangeProfile extends Component{
    constructor(props){
        super(props);
        
        this.state={
            auth: props.auth,
            user:{
                name:"",
                email:"",
                desc:"",
                github:"",
            },
            actualuser:firebase.auth().currentUser,
            showmodal:props.showmodal,
        }
        
    }
    toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block', 'code'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image'],  
        ['clean'],
                                          // remove formatting button
      ];
    modules = {
        
        toolbar: {
            container:this.toolbarOptions,
            /*handlers:{
                image:()=>this.quillImageCallBack()
                
            }*/
        },
        /*ImageResize: {
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        }*/
        
        
      }

      quillImageCallBack=()=>{
        
    }
    
      formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'color', 'clean', 'code-block', 'code', 'align'
      ]

      

      

      onChangedesc=(value)=>{
        this.setState({
            user:{
                ...this.state.user,
                desc:value,
            }
        })
      }
      onChangegithub=(value)=>{
        this.setState({
            user:{
                ...this.state.user,
                github:value,
            }
        })
    }

    onChangeat=(value)=>{
      this.setState({
          user:{
              ...this.state.user,
              email:value,
          }
      })
    }
    
      
      onChangename=(value)=>{
        this.setState({
            user:{
                ...this.state.user,
                name:value,
            }
            
        })
      }


    submitArticle=()=>{
        console.log(this.state.article)
        db.collection("users").doc(this.state.auth.uid).update({
            name:this.state.user.name,
            email: this.state.user.email,
            desc: this.state.user.desc,
            github: this.state.user.github,


            
        }

        ).then((res)=>{
            this.state.actualuser.updateProfile({
                displayName: this.state.user.name,
                
              }).then(() => {
                // Update successful
                this.props.history.push('/user-profile/'+this.state.auth.uid+'/'+this.state.user.name)
                // ...
              }).catch((error) => {
                // An error occurred
                // ...

                pr={
                    open:true,
                    msg:error.message,
                    color:'red'
                }
                this.state.showmodal(pr);
              });  
            
        }
        ).catch(error=>{
            pr={
                open:true,
                msg:error.message,
                color:'red'
            }
            this.state.showmodal(pr);
        })
        


    }
    submitpw(){
        
        this.state.actualuser.updateEmail(this.state.user.email).then(() => {
            // Update successful
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
            pr={
                open:true,
                msg:error.message,
                color:'red'
            }
            this.state.showmodal(pr);
          })
          this.state.actualuser.updatePassword(newPassword).then(() => {
            // Update successful.
            
            newPassword=''
          }).catch((error) => {
            // An error ocurred
            // ...
            pr={
                open:true,
                msg:error.message,
                color:'red'
            }
            this.state.showmodal(pr);
          })
        

            

        
    }
componentDidMount(){
    db.collection("users").doc(this.state.auth.uid).get().then(
        doc=>{console.log(doc.data())
        this.setState({
            user:{
                name:doc.data().name,
                email:doc.data().email,
                desc:doc.data().desc,
                github:doc.data().github,
            }
        }).catch(error=>{
            pr={
                open:true,
                msg:error.message,
                color:'red'
            }
            this.state.showmodal(pr);
        })
        })
        
    
    
}
    render(){
        return(
            <div>
                <Container>
                    <div>
                        <div >
                            <h2>Edit Profile</h2>
                            <FormGroup>
                                <Label>Display Name</Label>
                                <Input type='text' name='newName' id='newName' maxlength="20"
                                onChange={(el)=>this.onChangename(el.target.value) }
                                value={this.state.user.name}/>
                                {this.state.t}
                            </FormGroup>
                            
                            
                            
                            <FormGroup>
                                <Label>Github Link</Label>
                                <Input type='text' name='newyt' id='newyt'
                                onChange={(el)=>this.onChangegithub(el.target.value)}
                                value={this.state.user.github}/>
                                
                            </FormGroup>
                            <FormGroup>
                                <ReactQuill 
                                ref={(el)=>this.quill=el}
                                value={this.state.user.desc}
                                onChange={(el)=>this.onChangedesc(el)}
                                theme='snow'
                                formats={this.formats}
                                modules={this.modules}
                                />
                                Note: select text then click on link, select text then click on clean format (tx sorta symbol)
                                Note: first code is codeblock next is inline code
                                <br />
                                <br />
                                
                            </FormGroup>
                            <Button onClick={(e)=>this.submitArticle()}>Save profile</Button>
                            <br />
                            <br />
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type='text' name='newEmail' id='newEmail'
                                onChange={(el)=>this.onChangeat(el.target.value)}
                                value={this.state.user.email}/>
                                
                            </FormGroup>
                            <FormGroup>
                            
                                <Label>Change Password:</Label>
                             <Input id="input-field" type="password"  onChange={(e)=>{newPassword=e.target.value}} />A user can request for reset password a maximum of 3 times within 1 hour.<br />
                            </FormGroup>
                            
                        </div>
                        <div >
                            
                            <Button onClick={(e)=>this.submitpw()}>Confirm Changes</Button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

}

export default ChangeProfile