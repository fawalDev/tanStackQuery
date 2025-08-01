// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import PostsList1 from './PostsList1'
import PostsList2 from './PostsList2'
import Post from './Post'
import CreatePost from './CreatePost'
import PostsListPagination from './PostsListPagination'
import PostsListInfinity from './PostsListInfinity'


function App() {
  const [currentPage, setCurrentPage] = useState(<PostsListInfinity />)

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Post List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Post List 2
      </button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>
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
      <br />
      {currentPage}
    </div>
  )
}

// function wait(duration: number) {
//   return new Promise((resolve) => setTimeout(resolve, duration))
// }

export default App
