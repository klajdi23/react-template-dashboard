
import React from 'react';
import ExampleComponent from './exampleComponent';
import { Example } from '../types/ExampleType';

const ExampleComponentTemplate: React.FC = () => {
  const { data, loading } = ExampleComponent();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((item :Example, index : number) => (
        <li className={"bg-amber-800"} key={item.id}>{item.title}
        <p>
          {item.body}
        </p>
        </li>
      ))}
    </ul>
  );
};

export default ExampleComponentTemplate;
