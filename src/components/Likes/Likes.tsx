import cls from './Likes.module.scss'
import {ReactComponent as Like} from '../../assets/icons/Like.svg'
import classNames from "classnames";
import {memo} from "react";
import {useAppDispatch} from "../../lib/hooks/useAppDispatch/useAppDispatch";
import {postsActions} from "../../entities/Posts/slice/allPostsSlice";

export type LikeInfo = {
    isLike:boolean | null
    likes:number
    dislikes:number
}
interface LikesProps{
    id:number
    likeInfo: LikeInfo
}

export const Likes = memo((props:LikesProps) => {
    const dispatch = useAppDispatch()
    const {id,likeInfo} = props;
    const onClickLike = () => {
        dispatch(postsActions.changeLike(id))
    }
    const onClickDisLike = () => {
        dispatch(postsActions.changeDislike(id))
    }
    return (
        <div className={cls.likes}>
            <span>
                <button onClick={onClickLike}>
                    <Like className={classNames(cls.like,likeInfo.isLike=== true ? cls.green: '')}/>
                </button>
                <div>{likeInfo.likes}</div>
            </span>
            <span>
                <button onClick={onClickDisLike}>
                     <Like className={classNames(cls.dis,(false === likeInfo.isLike) ? cls.red: '')}/>
                </button>
                <div>
                    {likeInfo.dislikes}
                </div>
            </span>
        </div>
    );
});
