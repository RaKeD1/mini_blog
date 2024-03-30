import {AxiosResponse} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Post} from "../types/Post";
import {getPost} from "../services/getPost";

export interface PostFetch {
    post: Post | null;
    isLoading:boolean;
    error: string | undefined;
    status:string;

}
export const fetchPost = createAsyncThunk<
    AxiosResponse<Post>,
    {id:string, likes: number, dislikes: number, isLike: boolean | null},
    { rejectValue: string }
>('post/fetchOnePosts', async (params, { rejectWithValue }) => {
    try {
        const {id} = params;
        const response = await getPost(id);
        console.log('data', response.data);
        if (response.data){
            response.data.likes = params.likes
            response.data.dislikes = params.dislikes
            response.data.isLike = params.isLike
        }
        return response;
    } catch (error) {
        if (!error) {
            throw error;
        }
        return rejectWithValue('Error fetch post');
    }
});

const initialState: PostFetch = {
    post: null,
    isLoading: false,
    status: 'SUCCESS',
    error: undefined,
};
export const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost(state, action: PayloadAction<Post>) {
            state.post = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPost.fulfilled.type, (state,action: PayloadAction<AxiosResponse<Post>>) => {
            state.isLoading = false;
            state.status = "SUCCESS";
            state.post = action.payload.data;
            state.error = initialState.error;
        })
        builder.addCase(fetchPost.pending.type, (state) => {
            state.isLoading = true;
            state.status = "LOADING";
            state.error = initialState.error;
        });
        builder.addCase(fetchPost.rejected.type, (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.status = "ERROR";
            state.error = action.payload;
        });
    }
});

export const {
    actions: postActions,
    reducer: postReducer,
} = PostSlice;

