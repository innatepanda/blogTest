


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
  
} from 'reactstrap';
import './header.css'
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
                searchfunc:props.searchword,
                searchword:''
              
              }
              
              
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
                  
                  <Navbar dark expand="md" className="header">
                    <NavbarBrand href="/">XoRphilic</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.open} navbar>
                      <Nav className="ml-auto" navbar>
                      <NavItem>
                          <NavLink href='/'>Home</NavLink>
                          </NavItem>
                      
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                          {!this.props.auth.isEmpty?firebase.auth().currentUser.displayName:'Options'}
                          </DropdownToggle>
                          <DropdownMenu right>
                          {this.props.auth.isEmpty?
                        ' ': 
                          <DropdownItem>
                           
                          <button className="btn-none" href='/iJ6hjvpfuivhi0pvikbshvYVyfgv/new-article'>New Article</button>
                          
                          
                                
                        </DropdownItem>
                        
                        
                      }
                         {this.props.auth.isEmpty?
                        ' ': 
                          <DropdownItem>
                           
                         
                          
                          <button className="btn-none" href='/change-settings'>Profile Settings
                                </button>
                                
                        </DropdownItem>
                        
                        
                      }
                      <DropdownItem divider />
                          {          
                              
                              this.props.auth.isEmpty?
                              <DropdownItem>
                                <button href='/login'>
                                  Login
                                </button>
                              
                            </DropdownItem>
                            : <DropdownItem>
                              <button className="btn-none" onClick={()=>
                                {firebase.auth().signOut()
                                this.setState({
                                  display:'',
                                  name:''

                                })
                                
                              }
                                } href="/">
                                Logout
                              </button>
                          </DropdownItem>
                        } 
                            
                        
                            
                          
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                      
                    </Collapse>
                    <NavItem className="search-bar">
                                <input type='text' name='inp' id='inp'  onChange={(el)=>{this.onChangeSearch(el.target.value)} }/>
                                
                                  
                                
                                <button className="btn-none" onClick={async ()=>{
                                  console.log(this.state.searchword)
                                  if(this.state.searchword!=='')
                                  {
                                    await this.state.searchfunc(this.state.searchword)
                                  this.props.history.push('/searchpage/'+this.state.searchword )

                                  }
                                  
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                              </svg></button>

                    </NavItem>
                
                                
                                
                                
                  </Navbar>
                  
                </div>
              )
            }
            
        }
     



export default Heading;
