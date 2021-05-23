import React, {Component} from 'react'
import classes from './ViewArticle.module.css'

class ViewArticle extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }
        console.log(props.data)
    }

    render(){
        return(
            <div>
                view/new
            </div>
        )
    }
}

export default ViewArticle