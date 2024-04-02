import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
import { FC, JSX, memo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaLink, FaPlus, FaXmark } from "react-icons/fa6";
import { usePOST } from "../../hooks/post";
import { useMESSAGE, useMODAL } from "../../hooks";

interface IFormInput {
  isbn: string;
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

type Props = {
  reload: () => void;
};

const BookForm: FC<Props> = ({ reload }): JSX.Element => {
  const { handleClose, handleOpen, open } = useMODAL();
  const postMessage = useMESSAGE(() => {
    reload && reload();
    handleClose();
  });

  const postData = usePOST<IFormInput>("/books", postMessage);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      isbn: "",
    },
    reValidateMode: "onSubmit",
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    postData.mutate(data);
  };

  return (
    <>
      <Button startIcon={<FaPlus />} onClick={handleOpen} variant="contained">
        Create a book
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-body"
      >
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={style}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            id="modal-modal-title"
          >
            <Typography component={"h4"} variant="h6" fontWeight={500}>
              Create a book
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
          <Box id="modal-modal-body" my={3}>
            <Controller
              name="isbn"
              control={control}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2" textTransform={"uppercase"}>
                    isbn
                  </Typography>
                  <TextField
                    size="small"
                    color={errors.isbn ? "error" : "primary"}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLink />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="______________"
                    {...field}
                    {...register("isbn", { required: true })}
                    aria-invalid={errors.isbn ? true : false}
                  />
                </>
              )}
            />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                disabled={postData.pending}
                onClick={handleClose}
                variant="outlined"
                fullWidth
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                disabled={postData.pending}
                type="submit"
                variant="contained"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default memo(BookForm);
