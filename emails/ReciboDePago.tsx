import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Tailwind,
  Section,
  Row,
  Column,
  Hr,
} from "@react-email/components";

// Define las propiedades (props) que el endpoint te pasará
interface ReciboDePagoProps {
  nombreUsuario?: string;
  monto?: number;
  fecha?: string;
  idTransaccion?: string;
}

// ----------------------------------------------------
// Exporta el componente principal
// ----------------------------------------------------
const ReciboDePago = ({
  nombreUsuario,
  monto,
  fecha,
  idTransaccion,
}: ReciboDePagoProps) => (
  <Html>
    <Head />
    {/* Tailwind te permite usar clases CSS como "bg-white" o "p-4" */}
    <Tailwind>
      <Body className="bg-gray-100 my-auto mx-auto font-sans">
        <Container className="bg-white border border-solid border-[#eaeaea] rounded my-10 mx-auto p-8 w-[600px] shadow-lg">
          <Heading className="text-black text-2xl font-bold text-center mb-6">
            Recibo de Pago - Habituo App
          </Heading>

          <Text className="text-gray-700 text-base leading-6">
            Estimado/a **{nombreUsuario}**,
          </Text>

          <Text className="text-gray-700 text-base leading-6">
            ¡Tu pago se ha procesado con éxito! Aquí tienes el detalle completo
            de la transacción.
          </Text>

          <Hr className="border border-solid border-gray-300 my-6" />

          {/* Sección de Detalle de Pago */}
          <Section className="mb-6">
            <Row>
              <Column className="w-1/2">
                <Text className="text-gray-500 text-sm font-semibold m-0">
                  Fecha de Transacción:
                </Text>
              </Column>
              <Column className="w-1/2">
                <Text className="text-black text-base font-medium m-0 text-right">
                  {fecha}
                </Text>
              </Column>
            </Row>
            <Row className="mt-2">
              <Column className="w-1/2">
                <Text className="text-gray-500 text-sm font-semibold m-0">
                  ID de Transacción:
                </Text>
              </Column>
              <Column className="w-1/2">
                <Text className="text-black text-base font-medium m-0 text-right">
                  {idTransaccion}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr className="border border-solid border-gray-300 my-6" />

          {/* Sección de TOTAL */}
          <Section className="bg-green-50 p-4 rounded-md">
            <Row>
              <Column className="w-1/2">
                <Text className="text-lg font-bold text-green-700 m-0">
                  TOTAL PAGADO:
                </Text>
              </Column>
              <Column className="w-1/2">
                <Text className="text-2xl font-extrabold text-green-700 m-0 text-right">
                  ${monto?.toFixed(2)}
                </Text>
              </Column>
            </Row>
          </Section>

          <Text className="text-gray-500 text-xs mt-8 text-center">
            Este es un correo automático. Por favor, no respondas a este
            mensaje.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

// ----------------------------------------------------
// Datos de Prueba para la previsualización local (npx react-email dev)
// ----------------------------------------------------
ReciboDePago.defaultProps = {
  nombreUsuario: "Natalia Pérez",
  monto: 49.99,
  fecha: new Date().toLocaleDateString("es-ES"),
  idTransaccion: "TXN-8374823901",
};

export default ReciboDePago;
