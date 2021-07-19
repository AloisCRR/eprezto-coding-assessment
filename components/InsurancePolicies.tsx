import { useSelector } from "react-redux";
import { JSONData } from "../pages/api/insurance-policies";
import { initialState } from "../redux-store";
import styles from "../styles/App.module.css";
import Card from "./Card";

interface Props {}

export default function InsurancePolicies({}: Props) {
  const insurancePolicies = useSelector<initialState, JSONData[]>(
    (state) => state.insurancePolicies
  );

  return (
    <div className={styles.grid}>
      {insurancePolicies.map((value) => (
        <Card data={value} key={value.id} />
      ))}
    </div>
  );
}
