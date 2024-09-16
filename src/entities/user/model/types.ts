export interface IUser {
  id: number,
  firstName: string,
  lastName: string,
  middleName: string,
  phone: string,
  position: string,
  status: {
    id: number
    label:string
  },
  image: File | string | null
}
