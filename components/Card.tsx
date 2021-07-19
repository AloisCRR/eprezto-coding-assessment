import styles from "../styles/App.module.css";
import Image from "next/image";

interface Props {}

export default function Card({}: Props) {
  return (
    <div className={styles.card}>
      <h4 className="text-2xl font-bold text-center mb-3">SURA</h4>
      <div className="text-center mb-3">
        <span className="text-3xl font-bold">45</span>
        <span className="font-semibold"> / mes</span>
      </div>
      <div className="flex items-center justify-center mb-3">
        <Image
          src="https://d29fo3cabnm3fy.cloudfront.net/Avatars/avatar_17.png"
          alt="Avatar"
          width={30}
          height={30}
        ></Image>
        <span className="ml-3 mr-1 font-semibold text-lg">145+</span> lo
        utilizan
      </div>
      <div>Lesiones corporales</div>
      <meter className="w-full" max={100} low={30} value={50}></meter>
      <div>Daños a propiedad</div>
      <meter className="w-full"></meter>
      <div>Gastos médicos</div>
      <meter className="w-full"></meter>
      <div className="mt-3 text-center">Mas información</div>
    </div>
  );
}
