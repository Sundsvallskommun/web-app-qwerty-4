interface EmptyLayoutProps {
  children: React.ReactNode;
}

export default function EmptyLayout({ children }: EmptyLayoutProps) {
  return (
    <div className="EmptyLayout bg-background-content text-body">
      <div className="min-h-svh">{children}</div>
    </div>
  );
}
