import React from 'react'
import {Card, CardImg, CardTitle, CardSubtitle, CardBody, Badge } from 'reactstrap'
import {Link} from 'react-router-dom'
import classes from './ArticleCard.module.css'



const ArticleCard=(props)=>{
    
    return(<Card className={classes.ArticleCard}>
        
        <CardImg
            top
            width="100%"
            src="http://placeimg.com/325/180/arch/grayscale"
            alt="Card Img"
            className={classes.CardImg}

        />
        <CardBody className={classes.CardBody}>
        <CardTitle className={classes.CardTitle}>
            {props.data.Title}
        </CardTitle>
        <CardSubtitle className={classes.CardSubtitle}>
            
        
        <b>{props.data.Created.split("-")[2]}-{props.data.Created.split("-")[1]}-{props.data.Created.split("-")[0]}</b> by <b>{props.data.Author}</b>
            <p>
            {props.data.Content}
            </p>
        </CardSubtitle>
        
        <Link to={{pathName:'/article/'  +props.data.id+'/'+props.data.Title, state:{article:props.data}}}> Go </Link>
        </CardBody>
        
    </Card>
    );
}

export default ArticleCard
