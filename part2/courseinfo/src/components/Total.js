import React from 'react';

const Total = ({ course }) => {
  const total = course.parts.reduce((a, b) => {
    return (
      {
        exercises: a.exercises + b.exercises
      }
    )
  });

  return (
    <div>
      <p>
        <b>
          total of {total.exercises} exercises
        </b>
      </p>
    </div>
  )
}

export default Total;