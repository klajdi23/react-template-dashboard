import useExampleHook from '../hooks/useExampleHook';

const ExampleComponent = () => {
  const { data, loading } = useExampleHook();

  return { data, loading };
};

export default ExampleComponent;
