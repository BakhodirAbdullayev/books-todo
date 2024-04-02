import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGET } from "../../hooks";
import { Box, CircularProgress, Grid } from "@mui/material";
import Card from "../../components/card";
import { BookType } from "../../utils/types";

const Search: FC = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") ?? "";
  const [searchedBooks, searchLoading, searchReload] = useGET<BookType>(
    `/books/${title}`,
    []
  );
  useEffect(() => {
    if (title !== "") {
      searchReload(`/books/${title}`);
    }
  }, [title]);
  return (
    <>
      <Grid container mt={3} spacing={2}>
        {searchLoading ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
          >
            <CircularProgress size={50} />
          </Box>
        ) : searchedBooks?.length > 0 ? (
          searchedBooks?.map((item: BookType) => (
            <Grid item key={item.isbn} md={4} sm={6} width={"100%"}>
              <Card {...{ book: item }} noBtn />
            </Grid>
          ))
        ) : (
          "no data"
        )}
      </Grid>
    </>
  );
};

export default Search;
