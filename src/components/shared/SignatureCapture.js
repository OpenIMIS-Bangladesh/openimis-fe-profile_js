// SignatureCapture.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { FormattedMessage } from "@openimis/fe-core";
import Cropper from "react-cropper";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    padding: theme.spacing(3),
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    border: "2px dashed #ccc",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(3),
  },
  uploadIcon: {
    fontSize: 40,
    color: theme.palette.primary.main,
  },
  fileList: {
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    borderRadius: theme.shape.borderRadius,
  },
  fileItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 0),
    borderBottom: "1px solid #eee",
  },
  fileName: {
    color: "#005f67",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: 500,
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
  dialogPaper: {
    maxWidth: 900,
    width: "95%",
    maxHeight: "75vh", // Smaller and nicer on all screens
  },
  cropperContainer: {
    height: 500,
    width: "100%",
    background: "#000",
  },
}));

const SignatureCapture = ({ files, setFiles,handleDelete }) => {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fetchedSignature = useSelector((store) => store.profile.document);
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load Cropper CSS
  useEffect(() => {
    setFiles([...fetchedSignature])
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/cropperjs@1.6.2/dist/cropper.min.css";
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  console.log({fetchedSignature})

  const uploadFileToApi = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);

    try {
      setIsUploading(true);
      const response = await fetch("/api/workforce/document/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw await response.json();

      const responseData = await response.json();
      console.log("Upload success:", responseData);

      const fileWithInfo = {
        file,
        uploadInfo: responseData,
        name: file.name,
        url: responseData.file_url || URL.createObjectURL(file),
      };

      setFiles([fileWithInfo]); // Replace old signature
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCropAndUpload = () => {
    if (!cropperRef.current) return;

    cropperRef.current.cropper
      .getCroppedCanvas({
        width: 800,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      })
      .toBlob(async (blob) => {
        if (!blob) return;

        const croppedFile = new File([blob], "signature.png", {
          type: "image/png",
          lastModified: Date.now(),
        });

        await uploadFileToApi(croppedFile);
        setShowCropper(false);
        setImage(null);
      }, "image/png");
  };

  const handleCloseCropper = () => {
    setShowCropper(false);
    setImage(null);
  };

  const handleRemove = (file) => {
    setFiles([]);
    handleDelete(file)
  }
  const handleView = (file) => window.open(file.url, "_blank");

  console.log(files)

  return (
    <>
      {/* Upload Area */}
      <Paper className={classes.dropzone} elevation={0}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ cursor: "pointer" }}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUploadIcon className={classes.uploadIcon} />
          <Typography variant="body1" color="primary" style={{ marginLeft: 12 }}>
            <FormattedMessage
              module="profile"
              id="workforce.profile.uploadSignature"
              defaultMessage="Upload or Update Signature"
            />
          </Typography>
        </Box>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Paper>

      {/* Uploaded Signature */}
      {files.length > 0&& files[0] != null && (
        <Paper className={classes.fileList} elevation={1}>
          {files.map((file, i) => (
            <Box key={i} className={classes.fileItem}>
              <Typography
                variant="body2"
                className={classes.fileName}
                onClick={() => handleView(file)}
              >
                {file.name ||"Signature.png"}
              </Typography>
              <IconButton size="small" onClick={()=>handleRemove(file)}>
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </Box>
          ))}
        </Paper>
      )}

      {/* MUI Dialog for Cropper - Clean & Compact */}
      <Dialog
        open={showCropper}
        onClose={handleCloseCropper}
        maxWidth="md"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Crop Your Signature</Typography>
            <IconButton size="small" onClick={handleCloseCropper}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers className={classes.cropperContainer}>
          <Cropper
            src={image}
            style={{ height: "100%", width: "100%" }}
            aspectRatio={NaN}
            guides={true}
            viewMode={1}
            dragMode="move"
            cropBoxResizable={true}
            minCropBoxHeight={60}
            minCropBoxWidth={200}
            background={false}
            autoCropArea={0.9}
            checkOrientation={false}
            ref={cropperRef}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseCropper}>
            Cancel
          </Button>
          <Button
            onClick={handleCropAndUpload}
            disabled={isUploading}
            color="primary"
            variant="contained"
          >
            {isUploading ? "Uploading..." : "Crop & Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignatureCapture;