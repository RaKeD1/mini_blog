import {Post} from "../../Post/types/Post";

export interface Posts {
    posts: Post[];
    status:string;
    error?:string;
    isLoading:boolean
}