import styles from "../styles/App.module.css";
import Image from "next/image";
import { JSONData } from "../pages/api/insurance-policies";
import { useSelector } from "react-redux";
import { initialState } from "../redux-store";

interface Props {
  data: JSONData;
}

export default function Card({ data }: Props) {
  const meterElementData = useSelector<initialState, [number, number, number]>(
    (state) => [
      state.maxDanosPropiedad,
      state.maxGastosMedicos,
      state.maxLesionesCorporales,
    ]
  );

  const avatars = [
    "https://d29fo3cabnm3fy.cloudfront.net/Avatars/avatar_17.png",
    "https://d29fo3cabnm3fy.cloudfront.net/Avatars/avatar_18.png",
    "https://d29fo3cabnm3fy.cloudfront.net/Avatars/avatar_19.png",
    "https://d29fo3cabnm3fy.cloudfront.net/Avatars/avatar_20.png",
  ];

  return (
    <div className={styles.card}>
      <h4 className="text-2xl font-bold text-center mb-3">
        {data.companyName}
      </h4>
      <div className="text-center">
        <span className="text-3xl font-bold"> {data.monthlyPrice} </span>
        <span className="font-semibold"> / mes</span>
      </div>
      <small className="text-center block mb-3">B/.​ {data.price} </small>
      <div className="flex items-center justify-center mb-3">
        <Image
          src={avatars[Math.floor(Math.random() * avatars.length)]}
          alt="Avatar"
          width={30}
          height={30}
        ></Image>
        <span className="ml-3 mr-1 font-semibold text-lg">{data.rating}+</span>{" "}
        lo utilizan
      </div>
      <div>Lesiones corporales</div>
      <meter
        className="w-full"
        max={meterElementData[2]}
        value={
          data.coverage.lesiones_corporales.accidente +
          data.coverage.lesiones_corporales.persona
        }
      ></meter>
      <div>Daños a propiedad</div>
      <meter
        className="w-full"
        max={meterElementData[0]}
        value={
          data.coverage.danos_propiedad.accidente +
          data.coverage.danos_propiedad.persona
        }
      ></meter>
      <div>Gastos médicos</div>
      <meter
        className="w-full"
        max={meterElementData[1]}
        value={
          data.coverage.gastos_medicos.accidente +
          data.coverage.gastos_medicos.persona
        }
      ></meter>
      <div className="mt-3 text-center">Mas información</div>
    </div>
  );
}
