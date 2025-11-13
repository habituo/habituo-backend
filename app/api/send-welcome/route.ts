import { render } from "@react-email/render";
import * as React from "react";
import CorreoBienvenida from "../../../emails/CorreoBienvenida";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipientEmail, name } = body;

    if (!recipientEmail || !name) {
      return NextResponse.json(
        { message: "Missing required fields (recipientEmail and name)" },
        { status: 400 }
      );
    }

    const emailHtml = await render(
      React.createElement(CorreoBienvenida, {
        nombreUsuario: name,
      })
    );

    const { error } = await resend.emails.send({
      from: "...",
      to: recipientEmail,
      subject: `¡Bienvenido a Habituo, ${name}!`,
      html: emailHtml,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Correo de bienvenida enviado con éxito.",
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
