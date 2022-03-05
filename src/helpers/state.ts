const state = <T>(initialValue: T) => {
  let changeHandler: (value: T) => void = () => {}

  const react = (onChange: (value: T) => void) => {
    changeHandler = onChange
    return getContainer()
  }

  let value = initialValue

  const set = (newValue: T) => {
    value = newValue
    changeHandler(value)
  }

  const get = () => value

  const getContainer = () => ({ set, get, react })
  return getContainer()
}

export default state
