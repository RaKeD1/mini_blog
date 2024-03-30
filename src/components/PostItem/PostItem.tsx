import {Link} from "react-router-dom";
import {memo} from "react";
import cls from './PostItem.module.scss'
import {Likes} from "../Likes/Likes";
import {Post} from "../../entities/Post/types/Post";

export interface PostItemProps {
    post:Post
}

export const photo = 'http://lovejff.com/wp-content/uploads/2016/03/Depositphotos_25642693_original_resize.jpg'

export const PostItem = memo((props:PostItemProps) => {
    const {post:{
        id,title, img,body, isLike, dislikes, likes
    }} = props;
    return (
        <div className={cls.PostItem}>
            <img className={cls.img} src={img?img:photo} alt={'Default image'}/>
            <div className={cls.info}>
                <h3 className={cls.title}>{title}</h3>
                <Likes key={id} id={id} likeInfo={{isLike, likes, dislikes}}  />
                <p className={cls.text}>{body}</p>
                <Link className={cls.link} to={`/post/${id}`}>
                <button className={cls.button}>
                    Читать далее
                </button>
                </Link>
            </div>
        </div>
    );
});

export default PostItem;