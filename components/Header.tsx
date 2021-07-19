import Image from "next/image";
import EpreztoLogo from "../public/epreztoLogo.webp";

interface Props {}

export default function Header({}: Props) {
  return (
    <header className="pt-12 text-white flex-col">
      <div className="flex items-center justify-between">
        <Image src={EpreztoLogo} width={140} height={30} alt="Company logo" />
        <span className="hidden font-hind tracking-widest sm:inline">
          Eprezto Coding Assessment v1.0 | Alois Carrera
        </span>
      </div>
      <h1 className="text-center sm:text-left font-hind font-semibold text-3xl mt-14 mb-14 tracking-wider">
        Listado de pólizas
      </h1>
    </header>
  );
}
