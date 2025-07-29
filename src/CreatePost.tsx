import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef, type FormEvent } from "react"
import { createPost } from "./api/posts"
import Post from "./Post"

type Props = { setCurrentPage: (e: React.JSX.Element) => void }
export default function CreatePost({ setCurrentPage }: Props) {
    const titleRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: (data, variable, context) => {
            console.log(data, context);

            queryClient.setQueryData(['posts', data.id], data)
            // mutate old data with new data
            // queryClient.setQueryData(['posts', data.id], old => data)
            queryClient.invalidateQueries({ queryKey: ['posts'], exact: true, })

            setCurrentPage(<Post id={data.id} />)
        },
        // onError(error, variable, context) { },
        // onMutate(variables) { },
        // onSettled(data, error, variables, context) { },
        /* 
            Vòng đời useMutation()

            giá trị trả về trong method onMutate() sẽ nằm trong biến context của các method sau nó
            onMutate -> onSuccess -> onSettled
                |
                --> onError
        */

    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        createPostMutation.mutate({
            title: titleRef.current!.value,
            body: bodyRef.current!.value
        })
    }

    return (
        <>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" ref={titleRef} />
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <input id="body" type="text" ref={bodyRef} />
                </div>
                <button type="submit" disabled={createPostMutation.isPending}>
                    {createPostMutation.status === 'pending'
                        ? 'Loading ...'
                        : 'Submit'}
                </button>
            </form>

        </>
    )
}