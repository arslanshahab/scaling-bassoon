const errorCatcher = (error: any) => {
  console.log(error.response)
  const loginError = () => {
    return error.response.data.message
  }
  const registerError = () => {
    const errors = []
    for (const note in error.response.data.errors) {
      errors.push(error.response.data.errors[note])
    }
    return errors.join(' ')
  }
  const updateError = () => {
    const errors = []
    for (const note in error.response.data.errors) {
      errors.push(error.response.data.errors[note])
    }
    return errors.join(' ')
  }
  const requestPasswordError = () => {
    return error.response.data.developer_message
  }
  const resetPasswordError = () => {
    return error.response.data.developer_message
  }
  const confirmedPasswordError = () => {
    const errors = error.response.data.errors
    const errorPassword =
      errors && errors.current_password.length && errors.current_password[0]
    const errorMessage = errorPassword || errors.message
    return errorMessage
  }
  const returnMessage = () => {
    switch (error.response.config.url) {
      case 'auth/login':
        return loginError()
      case 'auth/register':
        return registerError()
      case 'auth/update-profile':
        return updateError()
      case 'auth/change-password':
        return requestPasswordError()
      case 'auth/reset-password':
        return resetPasswordError()
      case 'auth/update-password':
        return confirmedPasswordError()
      default:
        return 'Undefined error, please try again'
    }
  }
  const newError = returnMessage()
  throw new Error(newError)
}

export default errorCatcher
