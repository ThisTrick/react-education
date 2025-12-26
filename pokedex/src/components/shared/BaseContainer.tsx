import "./BaseContainer.css";

export default function BaseContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="base-container">{children}</div>;
}
