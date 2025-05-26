import { Box, Container, Link, List, ListItem, Typography } from "@mui/material";

import React from "react";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Privacy Policy ${titleSuffix}`,
  };
}

const Subtitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
    {children}
  </Typography>
);

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body1">
        Welcome to <strong>Amp'd Resume</strong>! We are committed to protecting your privacy and
        ensuring the security of your personal information. By using our services and providing your
        personal information, you agree to the practices described in this Privacy Policy.
      </Typography>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Information We Collect
        </Typography>
        <List>
          <ListItem sx={{ display: "block" }}>
            <Subtitle>Personal Information</Subtitle>
            <Typography variant="body2">
              When you sign up on <strong>Amp'd Resume</strong>, we collect your email address at
              signup. You can optionally add your location, skills, work history, education history,
              references, and letters.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "block" }}>
            <Subtitle>Usage Data</Subtitle>
            <Typography variant="body2">
              We may also collect information about how you interact with our website, such as IP
              addresses, browser types, and pages visited.
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          How We Use Your Information
        </Typography>
        <List>
          <ListItem sx={{ display: "block" }}>
            <Subtitle>Service Provision</Subtitle>
            <Typography variant="body2">
              We use your information to provide you with the services you requested, including
              maintaining your resume information on our platform.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "block" }}>
            <Subtitle>Communication</Subtitle>
            <Typography variant="body2">
              We may use your email address to communicate with you about our services, updates, and
              relevant information.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "block" }}>
            <Subtitle>Legal Compliance</Subtitle>
            <Typography variant="body2">
              We may disclose your information as required by law or to protect our rights.
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Data Security
        </Typography>
        <Typography variant="body1">
          We implement reasonable security measures to protect your personal information from
          unauthorized access and use. However, please note that no method of transmission over the
          internet or electronic storage is 100% secure.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Data Retention
        </Typography>
        <Typography variant="body1">
          We retain your personal information for as long as necessary to fulfill the purposes
          outlined in this Privacy Policy, unless a longer retention period is required or permitted
          by law.
          <br />
          &nbsp;
          <br />
          You can request to have your account and all information permanently deleted by emailingy
          our request to mail@ampdresume.com from the email address your account is associated with.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Third-Party Disclosure
        </Typography>
        <Typography variant="body1">
          We do not sell, trade, or otherwise transfer your personal information to outside parties
          except as outlined in this Privacy Policy or with your consent.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Future Use
        </Typography>
        <Typography variant="body1">
          In the future, we may sell access to aggregated and anonymized user information to
          recruiting companies and other entities for analytics and recruitment purposes. You will
          be notified if this becomes the case, and given the option to opt out by deleting your
          data.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Your Consent
        </Typography>
        <Typography variant="body1">
          By using our services, you consent to the collection, use, and storage of your information
          as described in this Privacy Policy.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Changes to this Privacy Policy
        </Typography>
        <Typography variant="body1">
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <Link href="mailto:mail@ampdresume.com">mail@ampdresume.com</Link>.
        </Typography>
      </Box>
    </Container>
  );
}
