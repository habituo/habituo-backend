import { Resend } from "resend";
import { render } from "@react-email/render";
import * as React from "react";
import CorreoBienvenida from "../../../emails/CorreoBienvenida";
import { NextApiRequest, NextApiResponse } from "next";

// Define el origen permitido (Ajusta a la URL de tu frontend)
const allowedOrigin = "https://habituo.es";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Inicializa Resend
  const resend = new Resend(process.env.RESEND_API_KEY);

  // 1. Configurar CORS Headers
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Desestructura los datos del usuario que vendrán del frontend
  const { recipientEmail, name } = req.body;

  if (!recipientEmail || !name) {
    return res
      .status(400)
      .json({ message: "Missing required fields (recipientEmail and name)" });
  }

  // Preview email link
  const previewLink = `https://habituo-backend.vercel.app/email/welcome-view?name=${name}`;

  try {
    // 2. Renderiza el componente a HTML (usando React.createElement)
    const emailHtml = await render(
      React.createElement(CorreoBienvenida, {
        nombreUsuario: name,
        emailUsuario: recipientEmail,
        previewUrl: previewLink,
      })
    );

    // 3. Envía el correo
    const { error } = await resend.emails.send({
      from: 'r@notifications.habituo.es',
      to: recipientEmail,
      subject: `¡Bienvenido a Habituo, ${name}!`,
      html: emailHtml,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      message: "Correo de bienvenida enviado con éxito.",
    });
  } catch (error: unknown) {
    // Manejo seguro del error
    const errorMessage =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
        ? error.message
        : "Error interno del servidor desconocido";

    return res.status(500).json({ error: errorMessage });
  }
}
