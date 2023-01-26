import React from "react";

export default function FileList({
  files,
  onDownload,
  pages,
  setPageNumberCallback,
  gotoPreviousPage,
  gotoNextPage,
}) {
  return (
    <div>
      <h1>All Uploaded Files</h1>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Sno</th>
              <th>File Name</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={file._id}>
                <td>{index + 1}</td>
                <td>{file.originalname}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onDownload(file)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" onClick={gotoPreviousPage}>
              Previous
            </a>
          </li>

          {pages.map((pageIndex) => (
            <li key={pageIndex} class="page-item">
              <a
                class="page-link"
                onClick={() => setPageNumberCallback(pageIndex)}
              >
                {pageIndex + 1}
              </a>
            </li>
          ))}

          <li class="page-item">
            <a class="page-link" onClick={gotoNextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
