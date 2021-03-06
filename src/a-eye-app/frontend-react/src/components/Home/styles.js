
const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: "100vh"
    },
    grow: {
        flexGrow: 1,
    },
    main: {

    },
    container: {
        backgroundColor: "#ffffff",
        paddingTop: "30px",
        paddingBottom: "20px",
    },
    dropzone: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        align: "center",
        margin: "auto",
        backgroundColor: "#d6e8e3",
        outline: "none",
        transition: "border .24s ease-in-out",
        cursor: "pointer",
        backgroundImage: "url('upload-opaque.png')",
        backgroundSize: '50%',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "500px",
        width: "500px"
    },
    processing: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        align: "center",
        margin: "auto",
        backgroundImage: "url('Spinner.gif')",
        backgroundSize: '100%',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "200px",
        width: "200px"
    },
    fileInput: {
        display: "none",
    },
    preview: {
        minWidth: "500px",
        minHeight: "500px",
    },
    help: {
        color: "#302f2f"
    },
    safe: {
        color: "#31a354",
    },
    caption: {
        color: "#183E3C",
    },
    captionTable: {
        width: "95%",
        maxWidth: "800px",
        marginTop: "15px",
        marginBottom: "25px",
        marginLeft: 'auto',
        marginRight: 'auto',
        border: "10px solid #183E3C",
    },
    playButton: {
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
    }
});

export default styles;