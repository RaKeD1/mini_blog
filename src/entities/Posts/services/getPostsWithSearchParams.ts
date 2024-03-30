import {$api} from "../../../shared/api/api";
import {AxiosResponse} from "axios";
import {Post} from "../../Post/types/Post";

export const getPostsWithSearchParams = (
    title?: string,
): Promise<AxiosResponse<Post[]>> => {
    if (title) {
        return $api.get<Post[]>(
            '/posts',
            {
                params: {title}
            }
        )
    }
    else {
        return $api.get<Post[]>(
            '/posts'
        );
    }
}