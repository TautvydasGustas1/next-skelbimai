import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import Axios from "axios";
import { CircularProgress, Box } from "@material-ui/core";

export interface ImagesDropzoneProps {
  jwt: String;
  adv_id: string;
  handleNext: () => void;
}

const ImagesDropzone = ({ jwt, adv_id, handleNext }: ImagesDropzoneProps) => {
  const [loading, setLoading] = useState(false);

  const getUploadParams = ({ meta }: any) => {
    const url = "https://httpbin.org/post";
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };

  const handleChangeStatus = ({ meta }: any, status: string) => {
    //console.log(status, meta);
  };

  const handleSubmit = (files: any, allFiles: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("advertisement", adv_id);
    allFiles.forEach((item: any) => {
      formData.append("images", item.file);
    });

    Axios.post("/api/computers/v1/upload", formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        setLoading(false);
        handleNext();
      })
      .catch((errors) => {
        setLoading(false);
        console.log(errors.message);
      });
  };

  return (
    <>
      <form onSubmit={(e) => console.log(e)}>
        <Dropzone
          submitButtonDisabled={loading}
          submitButtonContent={
            loading ? (
              <Box p={1}>
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              "Submit"
            )
          }
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          accept="image/*"
          inputContent={(files, extra) =>
            extra.reject
              ? "Image files only"
              : "Drag Product Images or Click to Browse"
          }
          styles={{
            dropzone: { overflow: "auto" },
            dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
            inputLabel: (files, extra) =>
              extra.reject ? { color: "red" } : {},
          }}
        />
      </form>
    </>
  );
};

export default ImagesDropzone;
