

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


      class Heading extends Component { 
        
            constructor(props){
              super(props);
              
              this.state={
                
              
              }
              console.log("in")
              this.open=false
              
              
            }
            toggle=()=>{
              this.open=!this.open
              console.log(this.open)
              
              
              
            }

            render()
            {
              
              return (
                <div>
                  <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Home</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.open} navbar>
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
                              <Button onClick={()=>firebase.auth().signOut()}>
                                Logout
                              </Button>
                          </DropdownItem>
                        } 
                            
                            <DropdownItem divider />
                            <DropdownItem>
                              Reset
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                      <NavbarText>{this.props.auth.displayName}</NavbarText>
                    </Collapse>
                  </Navbar>
                </div>
              )
            }
            
        }
     



export default Heading;