import { useState, useEffect, React} from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CommentTemplate from "./subcomponents/CommentTemplate";
import CreateComment from "./CreateComment";
import api from '../utils/Api';

function Comments({ dishId, userId, isAdmin }) {
    const [comments, setComments] = useState({});
    
    const onDelete = async (commentId) => {        
        const isSure = window.confirm(
            "Are you sure you want to delete the comment?"
        );
        if (!isSure) {
            return;
        }
        let res = await api.request("delete", `/dishes/${dishId}/comments/${commentId}`);
        if (res.status === 200) { alert("Dish deleted successfully") }
    };

    const getComments = async () => {
        const data = await api.request("get", `/dishes/${dishId}/comments`);
        console.log(data)
        if (data) {
            setComments(data);
        }
    };

    useEffect((_) => {
        const intervalId = setInterval(() => {
            getComments()
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <CreateComment dishId={dishId}/>
            {
                comments.length > 0 ? (
                    comments.map(comment => 
                    <div style={{'border': '1px solid grey', 'borderRadius': '10px', 'paddingBottom': '20px', 'margin': '20px 0 20px 0'}}>
                        <CommentTemplate comment={comment}/>
                        {
                            (comment.author._id == userId || isAdmin) && (
                                <Button color='danger' size="lg" onClick={e => onDelete(comment._id)}>Delete</Button>
                            )
                        }
                        {
                            (comment.author._id === userId) ? <NavLink to={`/edit-comment/${dishId}/${comment._id}`}><Button color='warning' size="lg">Edit</Button></NavLink> : null
                        }
                    </div>)
                ) : (
                    <h3>No comments...</h3>
                )
            }
        </div>
    );
}

export default Comments;