import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

type Post = {
  id: string
  title: string
}

const POSTS: Post[] = [
  { id: '1', title: 'post 1' },
  { id: '2', title: 'post 2' },
]

function App() {

  const queryClient = useQueryClient()

  const postQuery = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: (obj) => wait(1000).then(() => {
      console.log(obj);

      return [...POSTS]
    }),
  })


  const newPostMutation = useMutation({
    // mutationFn có tham số là giá trị thay đổi
    mutationFn: (title: string) => wait(1000).then(() =>
      POSTS.push({ id: crypto.randomUUID(), title: title })
    ),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'] as any)
    }
  })
  // console.log(newPostMutation.status==='success');

  if (postQuery.isLoading)
    return <h1>Loading...</h1>
  if (postQuery.isError)
    return <pre>{JSON.stringify(postQuery.error)}</pre>

  return (
    <div>
      {postQuery.data?.map(i => (
        <div key={i.id}>{i.title}</div>
      ))}
      <button
        disabled={newPostMutation.isPending}
        onClick={() => newPostMutation.mutate('new post')}>
        Add new
      </button>
    </div>
  )
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

export default App
