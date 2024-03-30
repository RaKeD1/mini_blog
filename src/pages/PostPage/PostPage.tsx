import {Suspense, useEffect} from "react";
import {useSelector} from "react-redux";
import {StateSchema} from "../../redux/StateSchema";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../lib/hooks/useAppDispatch/useAppDispatch";
import cls from './PostPage.module.scss'
import {fetchPost, postActions} from "../../entities/Post/slice/postSlice";
import {Post} from "../../entities/Post/types/Post";
import {Likes} from "../../components/Likes/Likes";
import {photo} from "../../components/PostItem/PostItem";
import PageLoader from "../../widgets/PageLoader/PageLoader";

export const PostPage = () => {
    const dispatch = useAppDispatch();
    const params = useParams()
    const navigate = useNavigate();
    const postId = params['*']
    const post = useSelector((state:StateSchema)=> state.post.post)
    const posts = useSelector((state:StateSchema)=> state.posts.posts)
    let thisPost: Post | undefined = undefined;



    if (posts.length){
        thisPost = posts.find(item => item.id.toString() === postId)
    }
         useEffect(()=>{
             if (!posts.length){
                 navigate('/')
             } else if (postId && thisPost) {
                     dispatch(fetchPost({id: postId, likes:thisPost.likes, isLike: thisPost.isLike , dislikes: thisPost.dislikes}))
             }
         },[])

    useEffect(() => {
        if (post && thisPost){
            dispatch(postActions.setPost(thisPost))
        }
    }, [thisPost, post, dispatch]);

    if (post) {
        const {id, isLike,likes, dislikes, img, title, body} = post
        return (
            <Suspense fallback={<PageLoader/>}>
                <div className={cls.PostPage}>
                    <div className={cls.header}>
                        <button onClick={() => navigate(-1)}> ⭠ Вернуться к статьям</button>
                        <Likes key={id} id={id} likeInfo={{isLike, likes, dislikes}}/>
                    </div>
                    <div className={cls.info}>
                        <h2 className={cls.title}>{title}</h2>
                        <img className={cls.img} alt={'Default image'} src={img ? img : photo}/>
                        <p className={cls.text}>{body}</p>
                    </div>
                </div>
            </Suspense>
        );
    }

    return null
}