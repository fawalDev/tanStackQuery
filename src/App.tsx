// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import PostList1 from './PostList1'
import PostList2 from './PostList2'
import Post from './Post'


function App() {
  const [currentPage, setCurrentPage] = useState(<Post id={1} />)

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostList1 />)}>
        Post List 1
      </button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>
        Post List 2
      </button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>
        First Post
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
