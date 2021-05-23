import React from 'react'
import {Card, CardImg, CardTitle, CardSubtitle, CardBody, Badge } from 'reactstrap'
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
            Test
        </CardTitle>
        <CardSubtitle className={classes.CardSubtitle}>
            Sub2
            <Badge color="secondary" >
                Sub
            </Badge>
        </CardSubtitle>
        </CardBody>
        
    </Card>
    );
}

export default ArticleCard
