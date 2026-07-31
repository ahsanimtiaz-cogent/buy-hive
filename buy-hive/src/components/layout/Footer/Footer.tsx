import { Facebook, LinkedIn } from "@mui/icons-material";
import { Box, Button, IconButton, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Logo } from "../../common/Logo";

const columns = [
  {
    title: "About Us",
    links: [
      "Our Story",
      "How to Buy",
      "Our Partners",
      "Contact Us",
      "Careers",
      "Terms of Use",
      "Privacy Policy",
    ],
  },
  {
    title: "Our Services",
    links: ["Expert Sourcing", "Contract Manufacturing", "Buy", "Financing"],
  },
  {
    title: "Account",
    links: [
      "Sign In",
      "Register to Buy",
      "My Profile",
      "My Orders",
      "Register to Sell",
      "Become a Sourcing Expert",
    ],
  },
];

const offices = [
  {
    name: "BuyHive Limited",
    lines: ["Dragon Industrial Bldg.", "Unit 8B, 93 King Lam St.", "Cheung Sha Wan,", "Kowloon, Hong Kong"],
  },
  {
    name: "BuyHive USA Inc.",
    lines: ["4730 South Fort Apache Rd.", "Suite 300", "Las Vegas, NV 89147", "USA"],
  },
];

const payments = [
  { src: "/payments/visa.png", alt: "Visa" },
  { src: "/payments/mastercard.png", alt: "Mastercard" },
  { src: "/payments/amex.png", alt: "American Express" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  // Front-end only: the real site posts this to HubSpot.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setEmail("");
  };

  const accepted = (
    <Box className="footer-accept">
      <Typography className="footer-heading">We accept</Typography>
      <Box className="payment-row">
        {payments.map((payment) => (
          <Box component="img" key={payment.alt} src={payment.src} alt={payment.alt} />
        ))}
        <Box className="payment-ach">
          <Box component="img" src="/payments/ach-bg.png" alt="" />
          <Box component="img" src="/payments/ach-text.png" alt="ACH" className="payment-ach-label" />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="footer" className="site-footer">
      <Box className="footer-inner">
        <Box className="footer-top">
          <Box className="footer-brand">
            <Logo />
            <Typography className="footer-blurb">
              Connecting buyers and manufacturers using the world’s best sourcing experts &amp;
              technology built by buyers, for buyers.
            </Typography>

            <Typography className="footer-heading footer-newsletter-title">
              Sign Up to Our Newsletter
            </Typography>
            <Box component="form" className="footer-form" onSubmit={handleSubmit}>
              <Typography component="label" htmlFor="footer-email" className="footer-label">
                Email<span>*</span>
              </Typography>
              <TextField
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="footer-input"
                variant="outlined"
                size="small"
              />
              <Button type="submit" className="footer-submit">
                Submit
              </Button>
            </Box>

            <Box className="footer-follow">
              <Typography className="footer-heading">Follow Us:</Typography>
              <Box className="footer-social">
                <IconButton href="#" aria-label="LinkedIn">
                  <LinkedIn />
                </IconButton>
                <IconButton href="#" aria-label="Facebook">
                  <Facebook />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {columns.map((column) => (
            <Box className="footer-col" key={column.title}>
              <Typography className="footer-heading">{column.title}</Typography>
              <Box component="ul" className="footer-links">
                {column.links.map((label) => (
                  <li key={label}>
                    <Link href="#" underline="none">
                      {label}
                    </Link>
                  </li>
                ))}
              </Box>
              {/* Sits under the first column on the real site. */}
              {column.title === "About Us" && accepted}
            </Box>
          ))}

          <Box className="footer-col">
            <Typography className="footer-heading">Our Locations</Typography>
            <Box className="footer-links footer-offices">
              {offices.map((office) => (
                <Box key={office.name}>
                  <Typography className="office-name">{office.name}</Typography>
                  <Typography className="office-address">
                    {office.lines.map((line) => (
                      <span key={line}>
                        {line}
                        {/* <br /> */}
                      </span>
                    ))}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="footer-bottom">
          <Typography component="span">© 2026 BuyHive Limited All Rights Reserved</Typography>
          <Box component="ul">
            <li>
              <Link href="#" underline="none">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="#" underline="none">
                Privacy Policy
              </Link>
            </li>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
