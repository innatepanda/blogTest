
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
class NewArticle extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            article:props.location.state.article,
            sum:150-props.location.state.article.Summary.length,
            t:20-props.location.state.article.Title.length
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

      

      onChangeTitle=(value)=>{
        
        this.setState({
            //t:this.state.t-(value.length-this.state.Title.length)
            t:20-value.length
            
        })
          this.setState({
              article:{
                  ...this.state.article,
                  Title:value,
                  
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
      onChangeDate=(value)=>{
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
              Category:value,
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
        db.collection("posts").doc(this.state.article.id).update({
            Title:this.state.article.Title,
            Content: this.state.article.Content,
            Created:this.state.article.Created,
            Summary: this.state.article.Summary,
            Youtube:this.state.article.Youtube,
            Category:this.state.article.Category,
            
        }

        ).then(
            res=>{

                console.log(res)

            }
        ).catch(err=>console.log(err))
        this.props.history.push('/')


    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xl={9} lg={9} md={8} sm={12} xs={12}>
                            <h2>Edit Article</h2>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input type='text' name='newtitle' id='newtitle' maxlength="20"
                                onChange={(el)=>this.onChangeTitle(el.target.value) }
                                value={this.state.article.Title}/>
                                {this.state.t}
                            </FormGroup>
                            <FormGroup>
                                <Label>Category</Label>
                                <Input type='text' name='newcat' id='newcat'
                                onChange={(el)=>this.onChangeCat(el.target.value)}
                                value={this.state.article.Category}/>
                                
                            </FormGroup>
                            <FormGroup>
                                <Label>Date</Label>
                                <Input type='date' name='newdate' id='newdate' 
                                onChange={(el)=>this.onChangeDate(el.target.value)}
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


export default NewArticle