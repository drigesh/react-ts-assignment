
export interface TodoTask{
    id: number,
    selected?: boolean,
    heading: string,
    list?: TodoTask[],
    parent_id?: number
}

export interface IAuthState{
    loggedin: boolean,
    email: string,
    loading: boolean
}