import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  );
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, item) => acc + item.exercises, 0);
  return (
    <p>Number of exercises {sum}</p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  );
};

export default Course;
