import { useInfiniteQuery } from "@tanstack/react-query"
import { getPostsPaginated } from "./api/posts"

export default function PostsListInfinity() {
    const {
        data, error, status,
        fetchNextPage, hasNextPage, isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['post', 'infinity'],
        queryFn: ({ pageParam }) => getPostsPaginated(pageParam),
        initialPageParam: 1,
        getNextPageParam: (last, all, lastPageParam) => lastPageParam + 1
    })

    if (status === 'pending')
        return <h1>Loading ...</h1>
    else if (status === 'error')
        return <h1>{error.message}</h1>

    return (
        <div>
            <h1>Infinity Scroll</h1>
            <ul>
                {data.pages.map(postsArr => {
                    return postsArr.map(i =>
                        <li key={i.id}>{i.id} --- {i.title} --- {i.body}</li>
                    )
                })
                }
            </ul>
            <button onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >{isFetchingNextPage ? ' loading ...' : 'load more'}
            </button>

        </div>
    )
}