
import BaseContainer from "../shared/BaseContainer";

import "./FilterContainer.css";

interface FilterContainerProps {
  titleVisibility?: boolean;
  title?: string;
  children: React.ReactNode;
}


export default function FilterContainer({ titleVisibility, title, children }: FilterContainerProps) {
  return <BaseContainer>
    {titleVisibility && <h3>{title}</h3>}
    {children}
  </BaseContainer>;
}
