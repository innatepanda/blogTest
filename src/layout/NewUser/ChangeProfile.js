
import React, {Component} from 'react'

import {Container, Row, Col, Card, CardHeader, FormGroup, Label, Input, Button} from 'reactstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import firebase from 'firebase'
import Compressor from 'compressorjs'
/*import Quill from 'quill';

import { ImageResize } from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);*/









const db=firebase.firestore();
class ChangeProfile extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            auth: props.auth,
            user:{
                name:this.props.
            }
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

      

      onChangeName=(value)=>{
        
        this.setState({
            
            t:20-value.length
            
        })
          this.setState({
              article:{
                  ...this.state.article,
                  Name:value,
                  
              }
          })
          
      }

      onChangeContent=(value)=>{
        this.setState({
            article:{
                ...this.state.article,
                Content:value,
            }
        })
      }
      onChangegithub=(value)=>{
        this.setState({
            article:{
                ...this.state.article,
                Created:value,
            }
        })
    }

    onChangeat=(value)=>{
      this.setState({
          article:{
              ...this.state.article,
              Email:value,
          }
      })
    }
    onChangeSum=(value)=>{
        this.setState({
            article:{
                ...this.state.article,
                Summary:value,
            }
            
        })
        this.setState({
            sum:150-value.length
            
        })


      }
      onChangeYt=(value)=>{
        this.setState({
            article:{
                ...this.state.article,
                Youtube:value,
            }
            
        })
      }


    submitArticle=()=>{
        console.log(this.state.article)
        db.collection("users").doc(this.state.article.id).update({
            name:this.state.user.name,
            email: this.state.user.email,
            desc: this.state.desc,


            
        }

        ).then(
            res=>{

                console.log(res)

            }
        ).catch(err=>console.log(err))
        this.props.history.push('/article/'+this.state.article.id+'/'+this.state.article.Name)


    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xl={9} lg={9} md={8} sm={12} xs={12}>
                            <h2>Edit Profile</h2>
                            <FormGroup>
                                <Label>Display Name</Label>
                                <Input type='text' name='newName' id='newName' maxlength="20"
                                onChange={(el)=>this.onChangeName(el.target.value) }
                                value={this.state.auth.name}/>
                                {this.state.t}
                            </FormGroup>
                            <FormGroup>
                                <Label>Emailegory</Label>
                                <Input type='text' name='newEmail' id='newEmail'
                                onChange={(el)=>this.onChangeEmail(el.target.value)}
                                value={this.state.article.Email}/>
                                
                            </FormGroup>
                            <FormGroup>
                                <Label>github</Label>
                                <Input type='github' name='newgithub' id='newgithub' 
                                onChange={(el)=>this.onChangegithub(el.target.value)}
                                value={this.state.article.Created}/>
                                
                            </FormGroup>
                            <FormGroup>
                                <Label>Summary</Label>
                                <Input type='text' name='newsum' id='newsum' maxlength="150"
                                onChange={(el)=>this.onChangeSum(el.target.value)}
                                value={this.state.article.Summary}/>
                                {this.state.sum}
                            </FormGroup>
                            <FormGroup>
                                <Label>Youtube Link</Label>
                                <Input type='text' name='newyt' id='newyt'
                                onChange={(el)=>this.onChangeYt(el.target.value)}
                                value={this.state.article.Youtube}/>
                                
                            </FormGroup>
                            <FormGroup>
                                <ReactQuill 
                                ref={(el)=>this.quill=el}
                                value={this.state.article.Content}
                                onChange={(el)=>this.onChangeContent(el)}
                                theme='snow'
                                formats={this.formats}
                                modules={this.modules}
                                />
                                Note: select text then click on link, select text then click on clean format (tx sorta symbol)
                                Note: first code is codeblock next is inline code
                            </FormGroup>

                        </Col>
                        <Col xl={3} lg={3} md={8} sm={12} xs={12}>
                            
                            <Button onClick={(e)=>this.submitArticle()}>Click me</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default ChangeProfile