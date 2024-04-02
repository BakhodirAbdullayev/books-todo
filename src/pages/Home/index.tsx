import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { FC, JSX } from "react";
import Card from "../../components/card";
import BookForm from "../../components/book-form";

import { useGET } from "../../hooks";
import { IBook } from "../../utils/types";
import NoData from "../../components/no-data";

const Home: FC = (): JSX.Element => {
  const [books, isLoading, reload] = useGET<IBook>("/books", []);

  return (
    <main>
      <Container maxWidth="xl">
        <Box
          marginTop={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={{ md: "row", xs: "column" }}
          textAlign={{ md: "left", xs: "center" }}
        >
          <Box>
            <Typography
              width={"max-content"}
              color="#fefefe"
              component={"h4"}
              variant="h5"
              fontSize={32}
              fontWeight={700}
            >
              You've got{" "}
              <Typography
                fontSize={"inherit"}
                fontWeight={"inherit"}
                component={"span"}
                color={"primary"}
              >
                {books?.length ?? 0} books
              </Typography>
            </Typography>
            <Typography
              variant="subtitle1"
              color="#fefefe"
              sx={{ opacity: 0.9 }}
            >
              Your task today
            </Typography>
          </Box>
          <Box
            width={"max-content"}
            display={"flex"}
            gap={1}
            alignItems={"center"}
          >
            <BookForm reload={reload} />
          </Box>
        </Box>

        <Box></Box>

        <Grid container mt={3} spacing={2}>
          {isLoading ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
            >
              <CircularProgress size={50} />
            </Box>
          ) : books?.length > 0 ? (
            books?.map((item: IBook) => (
              <Grid item key={item.book?.id} md={4} sm={6}>
                <Card {...item} reload={reload} />
              </Grid>
            ))
          ) : (
            <NoData />
          )}
        </Grid>
      </Container>
    </main>
  );
};

export default Home;
