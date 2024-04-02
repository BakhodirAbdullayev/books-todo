import { Box, Container, Typography } from "@mui/material";
import { FC, FormEvent, JSX } from "react";
import { FaMagnifyingGlass, FaRegBell } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Header: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString();
    if (title) {
      navigate(`/search?title=${title}`);
    }
  };
  return (
    <header>
      <Container maxWidth="xl">
        <Box
          pt={2}
          mb={{ md: 0, xs: 7 }}
          component={"div"}
          display="flex"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display="flex" alignItems={"center"} gap={2}>
            <Link
              to={"/"}
              style={{ display: "flex", alignItems: "center", gap: 15 }}
            >
              <img src="/logo.svg" alt="logo" />
              <Typography color="primary" fontWeight={700}>
                Books
              </Typography>
              <Typography ml={-1} color="#fff" fontWeight={700}>
                List
              </Typography>
            </Link>
            <Box
              component={"form"}
              display={"flex"}
              alignItems={"center"}
              onSubmit={handleSubmit}
              gap={2}
              ml={1}
              sx={{
                position: { md: "relative", xs: "absolute" },
                top: { md: 0, xs: "55px" },
                left: { md: 0, xs: 10 },
                width: { md: 300, xs: "calc(100% - 60px)" },
                height: 48,
                padding: "8px 12px",
                input: {
                  borderRadius: 1,
                  paddingLeft: 6,
                  paddingRight: 6,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: 14,
                  color: "#fefefe",
                  "&:focus": {
                    background: "#fefefe",
                    color: "#222",
                  },
                },
              }}
            >
              <button
                type="submit"
                style={{
                  fontSize: 18,
                  position: "absolute",
                  top: 14,
                  left: 25,
                  width: 20,
                  height: 20,
                  zIndex: 1000,
                  display: "grid",
                  placeItems: "center",
                  border: "none",
                  background: "none",
                }}
              >
                <FaMagnifyingGlass />
              </button>
              <input
                id="title"
                placeholder="Search for any training you want"
                name="title"
              />
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems={"center"}
            gap={4}
            sx={{
              img: {
                width: 36,
                height: 36,
                borderRadius: "50%",
                cursor: "pointer",
              },
            }}
          >
            <Box
              component={"span"}
              display={"grid"}
              width={30}
              height={30}
              sx={{ placeItems: "center" }}
              fontSize={30}
            >
              <FaRegBell />
            </Box>

            <img
              src="https://i.etsystatic.com/37333435/r/il/6d0fb5/4867170356/il_570xN.4867170356_k5k9.jpg"
              alt="image"
            />
          </Box>
        </Box>
      </Container>
    </header>
  );
};

export default Header;
