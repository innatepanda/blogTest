import React from 'react'
import './Modal.css'
class ErrorModal extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            details:props.content
             
           }
    }

    showmodal(req) {
        this.setState({ details:req }, ()=>{
          
          
        });
      }
    render(){
        
        var cname="content "+this.state.details.color
        var mname="modal "+this.state.details.open
      return(
        <div className={mname}>
            <div className={cname}>
               {
              this.state.details.msg
          }
          <button onClick={()=>{var toggle=this.state.details
          toggle={
              ...toggle,
              open: !toggle.open
          }
        this.setState({
            details:toggle
        })}}><span >&times;</span></button>
            </div>
          
        </div>
      )
             
      
    
    
    }
}

export default ErrorModal