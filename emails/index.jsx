// emails/index.jsx

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const EmailTemplate = ({
  userFirstname = "Patient",
  doctorName = "Doctor",
  appointmentDate = "Unknown date",
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your appointment confirmation with {doctorName}</Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.svg`}
          width="170"
          height="50"
          alt="WeCARE"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Your appointment with <strong>{doctorName}</strong> is confirmed for <strong>{appointmentDate}</strong>.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://your-app-domain.com">
            View Appointment Details
          </Button>
        </Section>
        <Text style={paragraph}>
          Best regards, <br /> The WeCARE Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center',
};

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '12px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};
