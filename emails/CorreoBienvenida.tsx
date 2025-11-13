import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Tailwind,
  Button,
  Hr,
  Link,
  Section,
  Img,
} from "@react-email/components";

interface BienvenidaProps {
  nombreUsuario?: string;
  emailUsuario?: string;
  previewUrl?: string;
}

const CorreoBienvenida = ({
  nombreUsuario,
  emailUsuario,
  previewUrl,
}: BienvenidaProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-gray-100 my-auto mx-auto font-sans p-4">
        <Container className="my-10 mx-auto w-[600px]">
          <Img
            alt="Logotipo de Habituo"
            height="30"
            src="https://habituo.es/static/media/light_habituo-logo.0aaf40bce397b9cb578fb5cdb2dbef4f.svg"
            className="mx-auto mb-4"
          />

          {/* Header */}
          <Section className="p-8 bg-white border border-2 border-gray-200 rounded-2xl text-center">
            <Heading className="m-0 text-2xl font-bold">
              ¡Bienvenido a Habituo! 👋
            </Heading>
            <Text className="m-0 mt-2 text-[16px] text-gray-700">
              Ya has dado tu primer paso, ahora continúa y construye tu mejor
              versión.
            </Text>
          </Section>

          {/* Main */}
          <Section className="mb-4 p-8 text-center">
            <Text className="m-0 text-gray-700 text-[16px] leading-[20px]">
              Hola <strong>{nombreUsuario}</strong>,
            </Text>
            <Text className="m-0 my-4 text-gray-700 text-[16px] leading-[20px]">
              Estamos encantados de tenerte en la comunidad. Habituo te ayudará
              a construir hábitos sólidos y alcanzar tus metas diarias.
            </Text>
            <Button
              href="https://habituo.es/dashboard"
              className="w-auto py-2 px-4 bg-orange-500 text-white font-semibold rounded-full text-center text-base"
            >
              Empezar a crear mi primer hábito
            </Button>
          </Section>

          {/* Footer */}
          <Section className="p-8 bg-white border border-2 border-gray-200 text-center rounded-2xl">
            <Text className="m-0 text-[16px] text-gray-900 leading-[22px]">
              Saludos,
            </Text>
            <Text className="m-0 font-semibold text-[16px] text-gray-900 leading-[22px]">
              el equipo de Habituo.
            </Text>
            <Hr className="border border-solid border-gray-200 my-4" />
            <Text className="m-0 font-semibold text-[12px] text-gray-500 leading-[24px]">
              Deja de soñar, empieza a construir
            </Text>
            <Text className="m-0 text-[12px] text-gray-500 leading-[18px]">
              Este correo electrónico fue enviado a {emailUsuario}
            </Text>
            <Text className="m-0 text-[12px] text-gray-500 leading-[18px]">
              Recibiste este correo electrónico porque creaste una cuenta en{" "}
              <strong>Habituo</strong>
            </Text>
            <Text className="text-center text-xs text-gray-500 mb-2">
              {previewUrl && (
                <Link
                  href={previewUrl}
                  className="text-gray-500 underline"
                  target="_blank"
                >
                  Ver en el navegador
                </Link>
              )}{" "}
              |{" "}
              <Link
                href="https://habituo.es/contact"
                className="text-gray-500 underline"
                target="_blank"
              >
                Contactar con nosotros
              </Link>{" "}
              |{" "}
              <Link
                href="https://habituo.es/policy"
                className="text-gray-500 underline"
                target="_blank"
              >
                Política de privacidad
              </Link>{" "}
              |{" "}
              <Link
                href="https://habituo.es/unsubscribe"
                className="text-gray-500 underline"
                target="_blank"
              >
                Darse de baja
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

CorreoBienvenida.defaultProps = {
  nombreUsuario: "Usuario Demo",
  emailUsuario: "usuariodemo@dominio.com",
  previewUrl: "https://habituo-backend.vercel.app/api/view-email?token=",
};

export default CorreoBienvenida;
