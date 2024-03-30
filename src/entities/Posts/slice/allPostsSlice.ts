import {AxiosResponse} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Posts} from "../types/Posts";
import {Post} from "../../Post/types/Post";
import {getPostsWithSearchParams} from "../services/getPostsWithSearchParams";

export const searchPosts = createAsyncThunk<
    AxiosResponse<Post[]>,
    {value: string },
    { rejectValue: string }
>('posts/fetchAllPostsWithParams', async (params, { rejectWithValue }) => {
    try {
        const { value } = params;
        const response = await getPostsWithSearchParams(value);
        console.log('data', response.data);
        const posts = response.data.map(item => {
            item.isLike = null
            item.likes =  Math.floor(Math.random() * (50 + 1));
            item.dislikes = Math.floor(Math.random() * (50 + 1));
            return item
        })
        response.data = posts
        return response;
    } catch (error:unknown) {
        if (!error) {
            throw error;
        }
        return rejectWithValue('Error witch searching posts');
    }
});

const initialState: Posts = {
    posts:[],
    isLoading: false,
    status: 'SUCCESS',
    error: undefined,
};
export const allPostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        changeLike(state, action: PayloadAction<number>) {
            const post = state.posts.find(post => post.id === action.payload);
            if (post){
                if (post.isLike === true){
                    post.likes -= 1
                    post.isLike = null
                }
                else if (post.isLike === false){
                    post.isLike = true
                    post.dislikes -= 1
                    post.likes += 1
                }
                else {
                    post.isLike = true
                    post.likes += 1
                }
            }
        },
        changeDislike(state, action: PayloadAction<number>) {
           const post = state.posts.find(post => post.id === action.payload);
           if (post){
               if (post.isLike === false){
                   post.dislikes -= 1
                   post.isLike = null
               }
               else if (post.isLike === true){
                   post.isLike = false
                   post.likes -= 1
                   post.dislikes += 1
               }
               else {
                   post.isLike = false
                   post.dislikes += 1
               }
           }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchPosts.fulfilled.type, (state, action: PayloadAction<AxiosResponse<Post[]>>) => {
            state.isLoading = false;
            state.status = "SUCCESS";
            state.posts = action.payload.data;
            state.error = initialState.error;
        });
        builder.addCase(searchPosts.pending, (state) => {
            state.isLoading = true;
            state.status = "LOADING";
            state.error = initialState.error;
        });
        builder.addCase(searchPosts.rejected.type, (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.status = "ERROR";
            state.error = action.payload;
        });
    },
});

export const {
    actions: postsActions,
    reducer: postsReducer,
} = allPostsSlice;

