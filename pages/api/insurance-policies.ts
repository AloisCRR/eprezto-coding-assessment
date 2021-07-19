import { JSONFile, Low } from "lowdb";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

interface Data {
  _id: string;
  id: number;
  policy_available: boolean;
  recomendado: boolean;
  bot_available: boolean;
  bot_port: string;
  sales_rating: string;
  Company: string;
  imagen: string;
  insurance_price_without_tax: string;
  Precio: string;
  monthly_price: string;
  opcion: number;
  CodPlan: number;
  cod_endoso: number;
  endoso: number;
  soat_sobat: null;
  ciaSeg: number;
  PrimaLC: number;
  PrimaDPP: number;
  PrimaGM: number;
  descuento: number;
  coberturas: Coberturas;
  beneficiosicons: Beneficiosicons;
  avatars: string[];
  bot_switched_time: string;
  comision_variable_referido: string;
}

interface Beneficiosicons {
  ambulancia: boolean;
  asistencia_vial: boolean;
  grua: boolean;
  revisado_gratis: boolean;
  asistencia_legal: boolean;
}

interface Coberturas {
  lesiones_corporales: Cobertura;
  danos_propiedad: Cobertura;
  gastos_medicos: Cobertura;
}

interface Cobertura {
  persona: number;
  accidente: number;
}

export interface Response {
  companyName: Data["Company"];
  monthlyPrice: Data["monthly_price"];
  price: Data["Precio"];
  coverage: Data["coberturas"];
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Partial<Response[]> | { error: string }>
) {
  const adapter = new JSONFile<Data[]>(
    path.join(__dirname, "..", "..", "..", "..", "db.json")
  );
  const db = new Low(adapter);
  await db.read();

  if (db.data != null) {
    const response = db.data.map(
      (object): Response => ({
        companyName: object.Company,
        coverage: object.coberturas,
        monthlyPrice: object.monthly_price,
        price: object.Precio,
      })
    );

    response.sort((a, b) => {
      if (a.price == b.price) return 0;

      if (a.price > b.price) return -1;

      if (b.price > a.price) return 1;

      return 0;
    });

    res.status(200).json(response);

    return;
  }

  res.status(200).json({ error: "Unable to load JSON DB" });
}
