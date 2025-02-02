import { Typography } from "@mui/material";
import { User } from "@prisma/client";

export const Header = ({ user }: { user: User }) => (
  <>
    <Typography
      sx={{ padding: 1, fontSize: 13, textAlign: "center", borderBottom: `1px solid #ccc` }}
    >
      {user?.location ? `${user.location} | ` : null}
      {user?.displayEmail ? <a href={`mailto:${user.displayEmail}`}>{user.displayEmail}</a> : null}
    </Typography>
    <Typography sx={{ mt: 1, fontSize: 26, fontWeight: "bold", textAlign: "center" }}>
      {user.name}
    </Typography>
    <Typography
      sx={{ mb: 2, mt: 1, fontSize: 13, fontWeight: "bold", textAlign: "center", letterSpacing: 0 }}
    >
      {user.title}
    </Typography>
  </>
);
