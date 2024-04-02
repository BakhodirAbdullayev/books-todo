import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FC, JSX } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/context";
import { toast } from "react-toastify";

interface IFormInput {
  name: string;
  email: string;
  key: string;
  secret: string;
}

const AuthForm: FC = (): JSX.Element => {
  const { pathname } = useLocation();
  const heading = pathname.replace("/", "").replace("-", " ");

  const ctx = useUser();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
      key: "",
      secret: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const postUser = (user: typeof data) =>
      fetch("https://no23.lavina.tech/signup", {
        method: "POST",
        body: JSON.stringify({ ...user }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.ok && res.status === 200) {
            ctx?.setUser({
              key: user.key,
              secret: user.secret,
            });
            toast.success("You successfully signed up!");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          if (!data.isOk) {
            toast.error(data.message);
          }
        })
        .catch((e) => console.log(e));

    postUser(data);
  };

  return (
    <>
      <Box
        width={"min(100vw, 430px)"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{ background: "#fefefe" }}
        component={"form"}
        // noValidate
        p={4}
        borderRadius={"12px"}
        boxShadow={2}
        margin={{ xs: 2, sm: 0 }}
      >
        <Typography
          component={"h4"}
          variant="h4"
          textAlign={"center"}
          textTransform={"capitalize"}
          fontWeight={600}
          mb={3}
        >
          {heading}
        </Typography>

        <Grid container spacing={1} mb={4}>
          <Grid item xs={24}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2" textTransform={"capitalize"}>
                    name
                  </Typography>
                  <TextField
                    size="small"
                    color={errors.name ? "error" : "primary"}
                    fullWidth
                    placeholder="Please, enter name"
                    {...field}
                    {...register("name", { required: true })}
                    aria-invalid={errors.name ? true : false}
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={24}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2" textTransform={"capitalize"}>
                    email
                  </Typography>
                  <TextField
                    type="email"
                    size="small"
                    color={errors.email ? "error" : "primary"}
                    fullWidth
                    placeholder="Please, enter email"
                    {...field}
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    aria-invalid={errors.email ? true : false}
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={24}>
            <Controller
              name="key"
              control={control}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2" textTransform={"capitalize"}>
                    key
                  </Typography>
                  <TextField
                    size="small"
                    color={errors.key ? "error" : "primary"}
                    fullWidth
                    placeholder="Please, enter key"
                    {...field}
                    {...register("key", {
                      required: true,
                    })}
                    aria-invalid={errors.key ? true : false}
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={24}>
            <Controller
              name="secret"
              control={control}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2" textTransform={"capitalize"}>
                    secret
                  </Typography>
                  <TextField
                    size="small"
                    color={errors.secret ? "error" : "primary"}
                    fullWidth
                    placeholder="Please, enter secret"
                    {...field}
                    {...register("secret", {
                      required: true,
                    })}
                    aria-invalid={errors.secret ? true : false}
                  />
                </>
              )}
            />
          </Grid>
        </Grid>

        {/*  */}
        <Button type="submit" variant="contained" sx={{ width: "100%" }}>
          Send
        </Button>
        <Grid
          container
          spacing={1}
          alignItems={"center"}
          justifyContent={"center"}
          pt={1}
        >
          <Grid item sm={4}>
            <Typography width={"max-content"} variant="subtitle2">
              Already signed up?{" "}
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography
              display={"inline-block"}
              variant="subtitle2"
              color={"primary"}
            >
              <Link to={"/sign-in"}> Go to sign in</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AuthForm;
