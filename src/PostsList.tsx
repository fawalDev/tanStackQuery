import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/posts"

export default function PostListQueries() {
    const postQuery = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        placeholderData: [{ id: 1, title: 'Initial Data' }],
        staleTime: 5000
    })

    if (postQuery.status === 'pending')
        return <h1>Loading ...</h1>

    else if (postQuery.status === 'error')
        return <h1>{JSON.stringify(postQuery.error)}</h1>

    return (
        <div>
            <h1>Posts List 2</h1>
            <ol>
                {postQuery.data.map(i =>
                    <li key={i.id}>{i.title}</li>
                )}
            </ol>
        </div>
    )
}