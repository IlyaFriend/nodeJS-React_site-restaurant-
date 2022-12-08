import React from 'react';
import { Container, Row, Col } from 'reactstrap';


function CommentTemplate({comment}) {
    let starsEmojis = new Array(5).fill('\u2606', 0, 4).fill('\u2B50', 0, comment.rating)
    return (
        <Container 
            className='marginBottom20'
            style={{'textAlign':'left', 'paddingBottom':'10px','borderBottom':'1px solid black'}}>
            <Row>
                <Col xs={12}><i>{comment.author.username}, {comment.rating}</i>{starsEmojis.join('')}</Col>
                <Col xs={12} style={{'fontSize':'large'}}>&nbsp;{`\t`+comment.comment}</Col>
            </Row>
        </Container>
    );
}

export default CommentTemplate;