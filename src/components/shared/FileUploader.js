import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Webcam from "react-webcam";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: "2px dashed #005f67",
    backgroundColor: "#f0f9fa",
    padding: theme.spacing(1),
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 8,
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#e3f4f6",
    },
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "32px",
    color: "#005f67",
  },
  optionBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    "& p": {
      fontWeight: 500,
      color: "#005f67",
    }
  },
  previewContainer: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(0.2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#DBEEF0",
    borderRadius: 5,
    border: "1px solid #005f67",
  },
  previewContent: {
    display: "flex",
    alignItems: "center",
    gap: "16px" // Replaces Stack spacing
  }
}));

const FileUploader = ({ onFileChange }) => {
  const classes = useStyles();
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const webcamRef = useRef(null);
  
  // Track mount status to prevent memory leak warnings
  const isMounted = useRef(true);
  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileProcessing = async (file) => {
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      
      // Only update state if component is still mounted
      if (isMounted.current) {
        setBase64Image(base64);
        setSelectedFile(file);
        
        if (onFileChange) {
          onFileChange(base64, file.name);
        }
      }
    } catch (err) {
      console.error("Error converting file to Base64", err);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    handleFileProcessing(file);
  }, []);

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc && isMounted.current) {
      setBase64Image(imageSrc);
      setSelectedFile({ name: `captured_photo_${Date.now()}.jpg` });
      if (onFileChange) onFileChange(imageSrc, `captured_photo_${Date.now()}.jpg`);
      setWebcamOpen(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setBase64Image("");
    if (onFileChange) onFileChange("", "");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
  });

  return (
    <Box width="100%">
      {!selectedFile ? (
        <Paper className={classes.dropzone} elevation={0}>
          <Box className={classes.iconContainer}>
            <Box {...getRootProps()} className={classes.optionBox}>
              <input {...getInputProps()} />
              <CloudUploadIcon />
              <Typography variant="body2">Upload</Typography>
            </Box>

            <Box 
              className={classes.optionBox}
              onClick={() => setWebcamOpen(true)}
            >
              <PhotoCameraIcon />
              <Typography variant="body2">Take a picture</Typography>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Box className={classes.previewContainer}>
          {/* Replaced <Stack> with <Box> and Flex styling */}
          <Box className={classes.previewContent}>
            {/* {base64Image && (
              <img 
                src={base64Image} 
                alt="Preview" 
                style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }} 
              />
            )} */}
            <Typography variant="body2" noWrap style={{ maxWidth: 200 }}>
              {selectedFile.name}
            </Typography>
          </Box>
          <IconButton onClick={removeFile} size="small">
            <DeleteIcon fontSize="small" style={{ color: "red" }} />
          </IconButton>
        </Box>
      )}

      <Dialog open={webcamOpen} onClose={() => setWebcamOpen(false)} maxWidth="xs" fullWidth>
        <DialogContent>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWebcamOpen(false)} color="default">Cancel</Button>
          <Button 
            onClick={capturePhoto} 
            variant="contained" 
            style={{ backgroundColor: "#005f67", color: "white" }}
          >
            Capture
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileUploader;