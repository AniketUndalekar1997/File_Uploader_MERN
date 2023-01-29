import React, { useState, useEffect, useRef } from "react";
import FileUploader from "../components/FilesUI/FileUploader";
import FileList from "../components/FilesUI/FileList";
import { getFile, getFiles, uploadFiles } from "../services/file-services";

const Row = ({ children }) => {
  return <div className="row">{children}</div>;
};

const Column = ({ children, ...props }) => {
  return (
    <div className={`col ${Object.keys(props)} shadow m-2`}>{children}</div>
  );
};

export default function FilesPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const downloadLinkRef = useRef();
  const fileToDownload = useRef();

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    getFiles(pageNumber).then((response) => {
      setFiles(response.files);
      setNumberOfPages(response.totalPages);
    });
  }, [pageNumber]);

  const onFilesSelect = (files) => {
    setSelectedFiles(files);
  };

  const setPageNumberCallback = (pageIndex) => {
    setPageNumber(pageIndex);
  };

  const gotoPreviousPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNextPage = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const onUpload = () => {
    uploadFiles(selectedFiles)
      .then(({ files: newFiles }) => {
        setFiles([...files, ...newFiles]);
        setSelectedFiles([]);
      })
      .catch((error) => console.log(error));
  };

  const handleDownload = (file) => {
    fileToDownload.current = file;
    getFile(file._id).then((url) => {
      const link = downloadLinkRef.current;
      link.href = url;
      link.download = file.originalname;
      link.click();
    });
  };
  return (
    <Row>
      <a ref={downloadLinkRef} href="" download={"file.txt"}></a>
      <Column col-8>
        <FileList
          onDownload={handleDownload}
          setPageNumberCallback={setPageNumberCallback}
          gotoPreviousPage={gotoPreviousPage}
          gotoNextPage={gotoNextPage}
          files={files}
          pages={pages}
        ></FileList>
      </Column>
      <Column>
        <FileUploader
          onFilesSelect={onFilesSelect}
          onUpload={onUpload}
          selectedFiles={selectedFiles}
        ></FileUploader>
      </Column>
    </Row>
  );
}
