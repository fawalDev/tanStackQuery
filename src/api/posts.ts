
const API_URI = import.meta.env.VITE_API_URI

export type Post = {
    id: number,
    title: string,
    userId?: number,
    body?: string
}

export function getPosts(): Promise<Post[]> {
    return fetch(API_URI + '/posts?_sort=title').then(res => res.json())
}

export function getPostsPaginated(page: number) {
    return fetch(API_URI + `/posts?_sort=title&_page=${page}&_limit=2`).then(res => res.json())
}

export function getPost(id: number): Promise<Post> {
    return fetch(API_URI + '/posts/' + id).then(res => res.json())
}

type CreatePost = { title: string, body: string }
export function createPost({ title, body }: CreatePost) {
    return fetch(API_URI + '/posts', {
        body: JSON.stringify({ title, body, userId: 1, id: Date.now() }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
}