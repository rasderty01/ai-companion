const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="items-center flex justify-center h-full">{children}</div>
  );
};

export default layout;
