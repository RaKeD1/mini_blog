import {AxiosResponse} from "axios";
import {$api} from "../../../shared/api/api";
import {Post} from "../types/Post";

export const getPost = (id:string): Promise<AxiosResponse<Post>> => {
    return $api.get<Post>(`/posts/${id}`);
}