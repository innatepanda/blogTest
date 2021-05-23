import React, {Component} from 'react'
import {Container} from 'reactstrap'
import ArticleCard from "../../../component/ArticleCard/ArticleCard"

class Main extends Component{
    constructor(props)
    {
        super(props)
        {
            this.state={

            }
        }
    }

    render(){
        return(
            <div>
                <ArticleCard/>

                
            </div>
        )
    }
}

export default Main