import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import DataService from "../../services/DataService";
import styles from './styles';

const Home = (props) => {
    const { classes } = props;

    console.log("================================== Home ======================================");

    const inputFile = useRef(null);

    // Component States
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [isProcessing, setIsProcessing] = useState(null);

    // Setup Component
    useEffect(() => {

    }, []);

    // Handlers
    const handleImageUploadClick = () => {
        inputFile.current.click();
    }
    const handleOnChange = (event) => {
        console.log(event.target.files);
        if (event.target.files.length > 0){
            setImage(URL.createObjectURL(event.target.files[0]));
            setIsProcessing(1);

            var formData = new FormData();
            formData.append("file", event.target.files[0]);
            DataService.Predict(formData, props.options[props.selectedIndex])
                .then(function (response) {
                    console.log(response.data);
                    setPrediction(response.data);
                    setIsProcessing(0);
                })
        }
    }
    const handlePlayAudio = (path) => {
        let response = DataService.Text2Audio(path)
        let audio = new Audio(response)
        audio.play()
    }

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="md" className={classes.container}>
                    {prediction && !isProcessing ?
                        <Table className={classes.captionTable}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Caption</TableCell>
                                    <TableCell>Audio</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prediction.prediction_captions.map((caption, idx) => 
                                <TableRow key={idx}>
                                    <TableCell>{caption}</TableCell>
                                    <TableCell>
                                        < div >
                                            <button className={classes.playButton} onClick={() => handlePlayAudio(prediction.audio_paths[idx])}><span className="material-icons">volume_up</span></button>
                                        </div >
                                    </TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>: null
                    }
                    {
                    isProcessing ?<div className={classes.processing}><Typography variant="h4" gutterBottom align='center'>
                    <span className={classes.caption}>Processing...</span>
                </Typography></div>: null
                    }
                    <div className={classes.dropzone} onClick={() => handleImageUploadClick()}>
                        <input
                            type="file"
                            accept="image/*"
                            capture="camera"
                            on='true'
                            autoComplete="off"
                            tabIndex="-1"
                            className={classes.fileInput}
                            ref={inputFile}
                            onChange={(event) => handleOnChange(event)}
                        />
                        <img className={classes.preview} src={image} />
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Home);