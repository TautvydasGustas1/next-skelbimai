import React from "react";
import Container from "@material-ui/core/Container";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import Advertisements from "../components/Advertisements";
import { Box } from "@material-ui/core";

export default function Home({ queryParams }: any) {
  return (
    <Layout>
      <Container>
        <Box mt={2}>
          <Advertisements queryParams={queryParams} />
        </Box>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      queryParams: ctx.query,
    },
  };
};
