import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function PostItem({ id, title, description, rating }) {
    return (
        <div>
            <Card >

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}

                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>


        </div>
    )
}

export default PostItem
