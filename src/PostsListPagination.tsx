import { useQuery } from "@tanstack/react-query"
import { getPostsPaginated } from "./api/posts"
import { useState } from "react"

export default function PostsListPagination() {
    const [page, setPage] = useState(1)
    const {
        status, error, data, isPlaceholderData, isFetching
    } = useQuery({
        queryKey: ['posts', { page }],
        placeholderData: (prev) => prev,
        queryFn: () => getPostsPaginated(page),
    })

    if (status === 'pending')
        return <h1>Loading ...</h1>
    else if (status === 'error')
        return <h1>{error.message}</h1>

    return (
        <div>
            <div>current page: {page}</div>
            <ul>
                {data.map(i =>
                    <li key={i.id}>{i.title} | {i.body} | {i.id}</li>
                )}
            </ul>
            <div>
                <button onClick={() => setPage(old => Math.max(old - 1, 0))}
                    disabled={isPlaceholderData || page === 1}>
                    prev
                </button>
                <button onClick={() => setPage(old => old + 1)}
                    disabled={isPlaceholderData || !data}>
                    next
                </button>
            </div>
            {isFetching && <div>Loading...</div>}

        </div>
    )
}