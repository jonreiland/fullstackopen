import React from 'react';

const Button = ({name, value, setState}) => {

  const handleClick = () => setState(value + 1);

  return (
    <button onClick={handleClick}>
      {name}
    </button>
  )
}

export default Button