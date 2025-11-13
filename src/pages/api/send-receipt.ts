import { Resend } from 'resend';
import { render } from '@react-email/render';
// Asegúrate que esta ruta importe tu componente correctamente.
import ReciboDePago from '../../../emails/ReciboDePago'; 

// Inicializa Resend. Obtiene la clave automáticamente de RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY);

// Define la función controladora de la API
export default async function handler(req: any, res: any) {
  // Asegúrate de que solo acepta POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Desestructura los datos del usuario que vendrán del frontend
  const { recipientEmail, name, amount } = req.body;

  if (!recipientEmail || !name || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // 1. Renderiza el componente React Email a HTML
    const emailHtml = render(
      <ReciboDePago
        nombreUsuario={name}
        monto={amount}
        fecha={new Date().toLocaleDateString("es-ES")}
      />
    );

    // 2. Envía el correo
    const { data, error } = await resend.emails.send({
      from: 'Equipo Habituo <onboarding@tu-dominio-verificado-en-resend.com>', 
      to: recipientEmail,
      subject: `Tu Recibo de Pago - Habituo App`,
      html: emailHtml,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    // 3. Responde al frontend
    return res.status(200).json({ success: true, data });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}