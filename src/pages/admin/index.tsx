import React from "react";
import TokenService from "../../Helpers/TokenHelper";
import { NextPageContext } from "next";
import { Container, Box } from "@material-ui/core";
import AdminLayout from "../../components/AdminLayout";
import Advertisements from "../../components/Advertisements";
import Axios from "axios";
import { useRouter } from "next/router";
import { useAlert } from "../../context/AlertContext";

export default function Admin({ queryParams, jwt }: any) {
  const router = useRouter();
  const [alertState, alertDispatch] = useAlert();

  function handleDelete(category: string, id: number) {
    if (confirm("Are you sure?")) {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };

      Axios.delete(`/api/${category}/v1/${id}`, config)
        .then((res) => {
          //Dispatch alert
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Successfully deleted an ad!",
              severity: "success",
            },
          });
          //Refresh page
          router.reload();
        })
        .catch((err) => {
          console.log(err);
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "There was an error deleting an ad",
              severity: "success",
            },
          });
        });
    }
  }

  return (
    <AdminLayout>
      <Container>
        <Box mt={2}>
          <Advertisements
            handleDelete={handleDelete}
            queryParams={queryParams}
            isAdmin={true}
          />
        </Box>
      </Container>
    </AdminLayout>
  );
}

Admin.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);
  await tokenService.authenticateAdmin(ctx, token);

  return {
    jwt: token,
    queryParams: ctx.query,
  };
};
