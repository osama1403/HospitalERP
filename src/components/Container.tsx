interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto">
      {children}
    </div>
  );
}

export default Container;