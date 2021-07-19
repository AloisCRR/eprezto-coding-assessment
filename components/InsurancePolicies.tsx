import Card from "./Card";
import styles from "../styles/App.module.css";
import { useSelector } from "react-redux";
import { JSONData } from "../pages/api/insurance-policies";
import { initialState } from "../redux-store";

interface Props {}

export default function InsurancePolicies({}: Props) {
  const insurancePolicies = useSelector<initialState>(
    (state) => state.insurancePolicies
  );

  console.log(insurancePolicies);

  return (
    <div className={styles.grid}>
      <Card />
    </div>
  );
}
