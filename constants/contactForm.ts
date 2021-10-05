export const contactFormFields: IContactField[] = [
  {
    name: 'name',
    label: 'Name',
    required: true,
    message: 'provideName',
    type: 'string',
  },
  {
    name: 'email',
    label: 'Email',
    required: true,
    message: 'provideEmail',
    type: 'email',
    pattern: new RegExp('/^[^s@]+@[^s@]+.[^s@]+$/'),
  },
  {
    name: 'phone',
    label: 'Telephone',
    message: '',
    required: false,
    type: 'string',
  },
  {
    name: 'message',
    label: 'Message',
    required: true,
    message: 'provideMessage',
    type: 'any',
  },
]

export type IContactField = {
  name: string
  label: string
  required: boolean
  message: string
  type: string
  hidden?: boolean
  pattern?: RegExp
}
