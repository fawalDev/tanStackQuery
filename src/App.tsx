// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import PostsList from './PostsList'
import Post from './Post'
import CreatePost from './CreatePost'
import PostsListPagination from './PostsListPagination'
import PostsListInfinity from './PostsListInfinity'
import PostsListQueries from './PostsListQueries'
import { useQueryClient } from '@tanstack/react-query'
import { getPost } from './api/posts'


function App() {
  const [currentPage, setCurrentPage] = useState(<PostsListInfinity />)

  const queryClient = useQueryClient()

  // Pre-fetching
  function onHoverPostLink() {
    queryClient.prefetchQuery({
      queryKey: ['posts', 1],
      queryFn: () => getPost(1)
    })
  }
  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList />)}>
        Posts List
      </button>
      <button onMouseEnter={onHoverPostLink} onClick={() => setCurrentPage(<Post id={1} />)}>
        First Post
      </button>
      <button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)}>
        Create Post
      </button>
      <button onClick={() => setCurrentPage(<PostsListPagination />)}>
        Post List Pagination
      </button>
      <button onClick={() => setCurrentPage(<PostsListInfinity />)}>
        Post List Pagination
      </button>
      <button onClick={() => setCurrentPage(<PostsListQueries />)}>
        Post List Queries
      </button>
      <br />
      {currentPage}
    </div>
  )
}

// function wait(duration: number) {
//   return new Promise((resolve) => setTimeout(resolve, duration))
// }

export default App
