const Button = ({ handleClick, blog, children }) => {
  return <button onClick={() => handleClick(blog)}>{children}</button>
}

export default Button
