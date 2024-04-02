import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC, FormEvent, JSX, memo, useState } from "react";
import { FaTrashCan, FaXmark } from "react-icons/fa6";
import { RiEditLine } from "react-icons/ri";
import { IBook } from "../../utils/types";
import { useDELETE, useMESSAGE, useMODAL, usePATCH } from "../../hooks";

const STATUS = ["New", "Reading", "Finished"];

interface Props extends IBook {
  reload?: () => void;
  noBtn?: boolean;
}

interface IStatus {
  status: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90vw, 430px)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};

const Card: FC<Props> = ({
  book: { title = "No title", author, pages, published, cover, id, isbn },
  status,
  reload,
  noBtn,
}): JSX.Element => {
  const { handleClose, handleOpen, open } = useMODAL();
  const deleteMessage = useMESSAGE(() => {
    reload && reload();
  });
  const editMessage = useMESSAGE(() => {
    reload && reload();
    handleClose();
  });

  const handleDelete = useDELETE(`/books/${id}`, deleteMessage);
  const [value, setValue] = useState(status);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number((event.target as HTMLInputElement).value));
  };
  const handleStatusChange = usePATCH<IStatus>(`/books/${id}`, editMessage);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      handleStatusChange.mutate({ status: value });
    }
  };

  return (
    <>
      <Box
        height={"100%"}
        width={"100%"}
        position={"relative"}
        sx={{
          "&:hover": { ".btn-group": { display: "block" } },
          boxShadow: "0px 4px 24px 0px #33333314",
        }}
      >
        <Box
          height={"100%"}
          p={2}
          pb={3}
          width={"100%"}
          sx={{ background: "#fefefe", overflow: "hidden" }}
          borderRadius={2}
        >
          <Typography
            fontSize={16}
            component="h6"
            variant="h6"
            fontWeight={600}
          >
            {title}
          </Typography>
          <Box
            height={"auto"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            pb={2}
          >
            <Box display={"flex"} flexDirection={"column"} mt={1}>
              <Typography variant="subtitle2" fontWeight={400} color={"#333"}>
                Cover: {cover}
              </Typography>
              {typeof pages === "number" && (
                <Typography variant="subtitle2" fontWeight={400} color={"#333"}>
                  Pages: {pages}
                </Typography>
              )}
              <Typography variant="subtitle2" fontWeight={400} color={"#333"}>
                Published: {published}
              </Typography>
              <Typography variant="subtitle2" fontWeight={400} color={"#333"}>
                ISBN: {isbn}
              </Typography>
            </Box>
            <Box
              mt={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                position: "absolute",
                width: "calc(100% - 40px)",
                bottom: 10,
              }}
            >
              <Typography variant="subtitle2" fontWeight={400} color={"#333"}>
                {author} / {published}
              </Typography>
              {typeof status === "number" && (
                <Chip
                  label={
                    <Typography
                      component={"span"}
                      fontSize={"12px"}
                      color={"white"}
                      fontWeight={700}
                    >
                      {STATUS[status]}
                    </Typography>
                  }
                  color={
                    status === 0
                      ? "error"
                      : status === 1
                      ? "warning"
                      : "success"
                  }
                  size="small"
                  sx={{ borderRadius: "6px" }}
                />
              )}
            </Box>
          </Box>
        </Box>
        {!noBtn && (
          <Box
            className="btn-group"
            position={"absolute"}
            top={10}
            zIndex={10}
            left={{ xs: "calc(100% - 16px)", md: "100%" }}
            display={{ md: "none", xs: "block" }}
          >
            <Button
              sx={{
                minWidth: "22px",
                fontSize: 16,
                padding: 1,
                borderEndStartRadius: 0,
              }}
              variant="contained"
              color="error"
              onClick={() => handleDelete()}
            >
              <FaTrashCan />
            </Button>
            <Button
              sx={{
                minWidth: "22px",
                fontSize: 16,
                padding: 1,
                borderStartStartRadius: 0,
              }}
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              <RiEditLine />
            </Button>
          </Box>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-body"
      >
        <Box sx={style} component={"form"} onSubmit={formSubmit}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            id="modal-modal-title"
          >
            <Typography component={"h4"} variant="h6" fontWeight={500}>
              Change book status
            </Typography>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="inherit"
              sx={{ minWidth: 0, padding: 0.5, borderRadius: "50%" }}
            >
              <FaXmark />
            </Button>
          </Box>
          <Box my={2}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              defaultValue={status}
              onChange={handleChange}
            >
              <FormControlLabel value={0} control={<Radio />} label="New" />
              <FormControlLabel value={1} control={<Radio />} label="Reading" />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Finished"
              />
            </RadioGroup>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                disabled={handleStatusChange.pending}
                onClick={handleClose}
                variant="outlined"
                fullWidth
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                disabled={handleStatusChange.pending}
                type="submit"
                variant="contained"
                fullWidth
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
export default memo(Card);
