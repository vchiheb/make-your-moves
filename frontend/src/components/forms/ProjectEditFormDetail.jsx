export default function ProjectEditFormDetails({ data }) {
  return (
    <div style={{ width: "100%" }}>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        fullWidth="true"
      >
        <Typography variant="h5">Edit Project</Typography>
        <TextField
          label="Project Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
          helperText={titleError ? "Project title is required" : ""}
          fullWidth="true"
        />
        <TextField
          label="Project Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={descriptionError}
          helperText={descriptionError ? "Project description is required" : ""}
          fullWidth="true"
        />

        <Button
          component="label" // Turns the Button into a label element
          role={undefined} // Optional: Explicitly define role for accessibility
          variant="contained"
          tabIndex={-1} // Prevents the label from being tab-focusable directly
          startIcon={<CloudUploadIcon />}
        >
          {coverImageFileName}
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>

        <TextField
          label="Cover Image Artist"
          variant="outlined"
          value={coverImageArtistName}
          onChange={(e) => setCoverImageArtistName(e.target.value)}
          error={descriptionError}
          helperText={descriptionError ? "Project description is required" : ""}
          fullWidth="true"
        />

        <TextField
          label="Cover Image Attribution Link"
          variant="outlined"
          value={coverImageAttributionLink}
          onChange={(e) => setCoverImageAttributionLink(e.target.value)}
          error={descriptionError}
          helperText={descriptionError ? "Project description is required" : ""}
          fullWidth="true"
        />

        <SubmitButton>Save</SubmitButton>
      </Box>
    </div>
  );
}
