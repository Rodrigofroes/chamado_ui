export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col mt-4 px-4 lg:px-8 pb-4 animate-fade-up">
      <div className="@container/main flex flex-1 flex-col gap-2">
        {children}
      </div>
    </div>
  );
}