import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  width: '400px',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const Previews = React.forwardRef((props, ref) => {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );

      props.clear();

      setTimeout(function() {
        props.classify();
      }, 1000);
    },
  });

  // const thumbs = files.map(file => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <img src={file.preview} style={img} alt="" />
  //     </div>
  //   </div>
  // ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {!!files[0] && (
          <div style={thumb} key={files[0].name}>
            <div style={thumbInner}>
              <img ref={ref} src={files[0].preview} style={img} alt="" />
            </div>
          </div>
        )}
      </aside>
    </section>
  );
});

export default Previews;
