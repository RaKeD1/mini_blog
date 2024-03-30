export interface Post {
    body?:string;
    title?:string;
    img?:string;
    id:number;
    likes:number;
    dislikes:number;
    isLike:boolean | null;
}