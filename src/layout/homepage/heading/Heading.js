

import {Link} from "react-router-dom";
import firebase from '../../../component/Config/firebase'
import React, { Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText, Button
} from 'reactstrap';

const db=firebase.firestore();
      class Heading extends Component { 
        
        getauth(){
    
    
          db.collection("users").doc(this.state.display).get().then(
              doc=>{
                if(doc.exists)
                {
                  console.log(doc.data().name)
                  this.setState({

                    name:doc.data().name
                      
                  })

                }
                  
                  
              }
             
      
          )
              
      
          }
            constructor(props){
              super(props);
              
              this.state={
                display:props.auth.email,
                name:'',
                open:false
              
              }
              console.log(props)
              
              if(!props.auth.isEmpty)
                this.getauth()
              
              
            }
            toggle=()=>{
              
              this.setState({
                open:!this.state.open

              })
              
            }

            render()
            {
              
              return (
                <div>
                  <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Home</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.open} navbar>
                      <Nav className="ml-auto" navbar>
                        {this.props.auth.isEmpty?
                        ' ': 
                          <NavItem>
                          <NavLink href='/iJ6hjvpfuivhi0pvikbshvYVyfgv/new-article'>New Article</NavLink>
                        </NavItem>
                        
                      }
                      
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            Options
                          </DropdownToggle>
                          <DropdownMenu right>
                          {          
                              
                              this.props.auth.isEmpty?
                              <DropdownItem>
                                <Link to={{pathname:'/login'}}>
                                  Login
                                </Link>
                              
                            </DropdownItem>
                            : <DropdownItem>
                              <Button onClick={()=>
                                {firebase.auth().signOut()
                                this.setState({
                                  display:'',
                                  name:''

                                })
                                
                              }
                                } href="/">
                                Logout
                              </Button>
                          </DropdownItem>
                        } 
                            {this.props.auth.isEmpty?
                        ' ': 
                          <DropdownItem>
                          <Link to={{pathname:'/change-settings', state:{profile:this.props.auth}}}>
                                  Profile Settings
                                </Link>
                        </DropdownItem>
                        
                      }
                        
                            <DropdownItem divider />
                            <DropdownItem>
                              Reset
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                      <NavbarText>{this.state.name}</NavbarText>
                    </Collapse>
                  </Navbar>
                </div>
              )
            }
            
        }
     



export default Heading;
