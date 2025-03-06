type ConditialRendererProps = {
  isLoading: boolean;
  trueComponent: React.ReactNode;
  falseComponent: React.ReactNode;
};

const ConditionalRenderer = ({
  isLoading,
  trueComponent,
  falseComponent,
}: ConditialRendererProps) => {
  return <>{isLoading ? trueComponent : falseComponent}</>;
};

export default ConditionalRenderer;
