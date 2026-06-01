export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full overflow-y-auto px-6 py-6 md:px-10 md:py-8">
      {children}
    </div>
  );
}