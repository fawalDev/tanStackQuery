
const API_URI = import.meta.env.VITE_API_URI

export type Post = {
    id: number,
    title: string,
    userId?: number,
    body?: string
}

export function getPosts() {
    return fetch(API_URI + '/posts?_sort=title').then(res => res.json())
}

export function getPostsPaginated(page: number) :Promise<Post[]>{
    // let headers: Headers
    return fetch(API_URI + '/posts' + `?_page=${page}&_limit=2`)
        .then(res => {
            // headers = res.headers
            return res.json()
        })
        // .then((data:Post[]) => ({
        //     total: headers.get('x-total-count'),
        //     data: data
        // }))
}

export function getPost(id: number): Promise<Post> {
    return fetch(API_URI + '/posts/' + id).then(res => res.json())
}

type CreatePost = { title: string, body: string }
export function createPost({ title, body }: CreatePost): Promise<Post> {
    return fetch(API_URI + '/posts', {
        body: JSON.stringify({ title, body, userId: 1, id: Date.now() }),
        method: 'post',
        headers: {
            'content-types': 'application/json'
        }
    })
        .then(res => res.json())
}
