import type { DebouncedState } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProrps {
  value: string;
  onSearch: DebouncedState<(newSearchInput: string) => void>;
}

export default function SearchBox({ value, onSearch }: SearchBoxProrps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={value}
      onChange={handleChange}
    />
  );
}
