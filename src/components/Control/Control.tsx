import { SORT_OPTIONS, type SortKey } from "../../utils/sortMovies";
import styles from "./Control.module.css";

type ControlProps = {
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
};

const Control = ({ sortKey, onSortChange }: ControlProps) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortKey);
  };

  return (
    <div className={styles.control}>
      <label htmlFor="sort">Sort:</label>
      <select id="sort" value={sortKey} onChange={handleSortChange}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Control;
