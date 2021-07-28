

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
  Button
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

                    name:doc.data().name,
                    searchword:'',
                    
                      
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
                open:false,
                searchfunc:props.searchword
              
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

            onChangeSearch(el){
              this.setState({
                searchword:el
              }, ()=>{

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
                          {!this.props.auth.isEmpty?firebase.auth().currentUser.displayName:'Options'}
                          </DropdownToggle>
                          <DropdownMenu right>
                          {this.props.auth.isEmpty?
                        ' ': 
                          <DropdownItem>
                          <Link to={{pathname:'/change-settings', state:{profile:this.props.auth}}}>
                                  Profile Settings
                                </Link>
                        </DropdownItem>
                        
                        
                      }
                      <DropdownItem divider />
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
                            
                        
                            
                          
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                      
                    </Collapse>
                    <input type='text' name='inp' id='inp' 
                                onChange={(el)=>{this.onChangeSearch(el.target.value)} }
                                />
                                
                                  
                                
                                    <button onClick={async ()=>{
                                      await this.state.searchfunc(this.state.searchword)
                                      this.props.history.push('/searchpage/'+this.state.searchword )
                                    }}>search</button>
                                
                                
                                
                  </Navbar>
                  
                </div>
              )
            }
            
        }
     



export default Heading;
