import {memo, useEffect, useRef, useState} from "react";
import PostItem from "../../components/PostItem/PostItem";
import cls from './MainPage.module.scss'
import {useAppDispatch} from "../../lib/hooks/useAppDispatch/useAppDispatch";
import { searchPosts} from "../../entities/Posts/slice/allPostsSlice";
import {useSelector} from "react-redux";
import {StateSchema} from "../../redux/StateSchema";
export const MainPage = memo(() => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const {posts} = useSelector((state:StateSchema) => state.posts)

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        const delaySearch = () => {
            timerId = setTimeout(() => {
                 dispatch(searchPosts({value}));
            }, 250);
        };
        delaySearch();
        return () => {
            clearTimeout(timerId);
        };
    }, [value, dispatch]);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div id='main' className={cls.main}>
            <>
                <h2 className={cls.title}>Блог</h2>
                <input
                    ref={inputRef}
                    className={cls.search}
                    type='text'
                    placeholder={'Поиск по названию статьи'}
                    value={value}
                    onChange={onChangeInput}
                />
                <div className={cls.items}>
                    {posts && (posts.map((post) => {
                        return (
                            <PostItem key={post.id} post={post}/>
                        )
                    }))}
                </div>
            </>
        </div>
    );
});

export default MainPage;