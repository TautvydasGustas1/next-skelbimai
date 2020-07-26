import React from "react";
import Dropzone from "react-dropzone-uploader";
import Axios from "axios";

const ImagesDropzone = () => {
  const getUploadParams = ({ meta }: any) => {
    // const headers = {
    //   headers: { Authorization: `Bearer ${jwt}` },
    // };

    //const url = "https://httpbin.org/post";
    const baseURL = Axios.defaults.baseURL;
    const url = baseURL + "/api/file/v1/upload";
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
      //headers,
    };
  };

  const handleChangeStatus = ({ meta }: any, status: string) => {
    console.log(status, meta);
  };

  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta));
    //allFiles.forEach((f: any) => f.remove());
  };

  return (
    <Dropzone
      submitButtonContent={""}
      submitButtonDisabled
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
        inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
        submitButton: { display: "none" },
      }}
    />
  );
};

export default ImagesDropzone;
