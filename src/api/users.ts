const API_URI = import.meta.env.VITE_API_URI

type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: string,
}

export function getUser(id: number): Promise<User> {
    return fetch(API_URI + '/users/' + id).then(i => i.json())
}