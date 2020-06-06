import React from 'react'

// we can declare some optional params by using '?' after it's declaretion
interface HeaderProps {
  title: string
}

// FC means Function Component => A component in function format
const Header: React.FC<HeaderProps> = (props) => {
  return(
    <header>
      <h1>{props.title}</h1>
    </header>
  )
}

export default Header