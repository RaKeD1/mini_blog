
import {Posts} from "../entities/Posts/types/Posts";
import {PostFetch} from "../entities/Post/slice/postSlice";

export interface StateSchema {
     posts: Posts,
     post: PostFetch,
}


