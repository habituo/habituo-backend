import { Resend } from "resend";
import { render } from "@react-email/render";
import * as React from "react";
import ReciboDePago from "../../emails/ReciboDePago";
import { NextApiRequest, NextApiResponse } from "next";

// Inicializa Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Define la función controladora de la API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo acepta POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Desestructura los datos del usuario que vendrán del frontend
  const { recipientEmail, name, amount } = req.body;

  if (!recipientEmail || !name || !amount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // 1. Renderiza el componente React Email a HTML
    const emailHtml = await render(
      React.createElement(ReciboDePago, {
        nombreUsuario: name,
        monto: amount,
        fecha: new Date().toLocaleDateString("es-ES"),
      })
    );

    // 2. Envía el correo
    const { data, error } = await resend.emails.send({
      from: "Equipo Habituo<r@notifications.habituo.es>",
      to: recipientEmail,
      subject: `Tu Recibo de Pago - Habituo`,
      html: emailHtml,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    // 3. Responde al frontend
    return res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    console.error(error);
    const errorMessage =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
        ? error.message
        : "Error desconocido del servidor";
    return res.status(500).json({ error: errorMessage });
  }
}
