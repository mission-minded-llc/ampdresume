import { Box, Container, Link, List, ListItem, Typography } from "@mui/material";
import React from "react";

import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Terms of Service ${titleSuffix}`,
  };
}

const Subtitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
    {children}
  </Typography>
);

export default function TermsOfService() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Terms of Service
      </Typography>

      <Typography variant="body1">
        Welcome to <strong>Amp&apos;d Resume</strong>! By accessing or using our website and
        services, you agree to comply with and be bound by the following Terms of Service. Please
        read them carefully.
      </Typography>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Use of Services
        </Typography>
        <List>
          <ListItem sx={{ display: "block" }}>
            <Subtitle>Eligibility</Subtitle>
            <Typography variant="body2">
              You must be at least 18 years old to use our services. By using{" "}
              <strong>Amp&apos;d Resume</strong>, you represent and warrant that you meet this
              requirement.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "block" }}>
            <Subtitle>Account Responsibility</Subtitle>
            <Typography variant="body2">
              You are responsible for maintaining the confidentiality of your account information
              and for all activities that occur under your account.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "block" }}>
            <Subtitle>Prohibited Activities</Subtitle>
            <Typography variant="body2">
              You agree not to use our services for any unlawful purpose or in any way that could
              harm <strong>Amp&apos;d Resume</strong> or others.
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          User Content
        </Typography>
        <Typography variant="body1">
          By submitting content to <strong>Amp&apos;d Resume</strong>, you grant us a non-exclusive,
          worldwide, royalty-free license to use, reproduce, and distribute your content for the
          purposes of providing our services.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Data Usage and Privacy
        </Typography>
        <Typography variant="body1">
          Your use of our services is also governed by our{" "}
          <Link href="/about/privacy-policy">Privacy Policy</Link>. By using{" "}
          <strong>Amp&apos;d Resume</strong>, you consent to the collection and use of your
          information as outlined in the Privacy Policy.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography variant="body1">
          <strong>Amp&apos;d Resume</strong> is not liable for any indirect, incidental, or
          consequential damages arising out of your use of our services. We do not guarantee that
          our services will be uninterrupted or error-free.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Indemnification
        </Typography>
        <Typography variant="body1">
          You agree to indemnify and hold harmless <strong>Amp&apos;d Resume</strong>, its
          affiliates, and its employees from any claims, damages, or expenses arising from your use
          of our services or violation of these Terms.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Termination
        </Typography>
        <Typography variant="body1">
          We reserve the right to suspend or terminate your access to our services at any time,
          without notice, for conduct that we believe violates these Terms or is harmful to other
          users of <strong>Amp&apos;d Resume</strong>.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Changes to Terms
        </Typography>
        <Typography variant="body1">
          We may update these Terms of Service from time to time. We will notify you of any changes
          by posting the new Terms of Service on this page.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Governing Law
        </Typography>
        <Typography variant="body1">
          These Terms of Service are governed by and construed in accordance with the laws of the
          jurisdiction in which <strong>Amp&apos;d Resume</strong> operates.
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions about these Terms of Service, please contact us at{" "}
          <Link href="mailto:mail@ampdresume.com">mail@ampdresume.com</Link>.
        </Typography>
      </Box>
    </Container>
  );
}
