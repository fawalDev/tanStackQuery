import { useQuery } from "@tanstack/react-query"
import { getPost } from "./api/posts"
import { getUser } from "./api/users"

export default function Post({ id }: { id: number }) {
    const postQuery = useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPost(id),
    })

    console.log(postQuery.data);
    
    const userQuery = useQuery({
        queryKey: ['users', postQuery.data?.userId],
        enabled: !!(postQuery.data),
        queryFn: () => getUser(postQuery.data?.userId!)
    })

    if (postQuery.status === 'pending')
        return <h1>Loading ...</h1>

    if (postQuery.status === 'error')
        return <h1>{JSON.stringify(postQuery.error)}</h1>

    return (
        <div>
            <h1>
                {postQuery.data.title}<br />
                <small>
                    {/* {postQuery.data.userId} */}
                    {userQuery.isLoading
                        ? 'User loading ...'
                        : userQuery.isError
                            ? 'Error loading user !'
                            : 'this is name:' + userQuery.data?.name
                    }
                </small>
            </h1>
            <p>{postQuery.data.body}</p>
        </div>
    )
}