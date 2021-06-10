import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//import Typography from '@material-ui/core/Typography';
import ButtonBase from "@material-ui/core/ButtonBase";
import axios from "axios";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
    marginTop: "80px",
    borderColor: "black",
    boxShadow: "5px 5px #9b59b6",
  },
  image: {
    width: 500,
    height: 500,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderColor: "black",
    borderRadius: "5px",
  },
}));

function View() {
  const classes = useStyles();
  const { isbn } = useParams();
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [preview, setPreview] = useState("");
  const [firstsentence, setFirstsentence] = useState("");

  //978-0-8213-8034-5
  //setPreview(result_dat.data[`ISBN:${isbn}`].thumbnail_url)
  //https://openlibrary.org/api/books?bibkeys=ISBN:${isbnnumber}&jscmd=details&format=json

  useEffect(() => {
    const lib_api = async () => {
      const result_dat = await axios.get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`
      );
      try {
        setBookname(result_dat.data[`ISBN:${isbn}`].details.title);
        setAuthor(result_dat.data[`ISBN:${isbn}`].details.authors[0].name);
      } catch (error) {
        setBookname("ERROR");
        setAuthor("ERROR");
      }

      try {
        setFirstsentence(
          result_dat.data[`ISBN:${isbn}`].details.first_sentence.value
        );
      } catch (err) {
        setFirstsentence("Data does not exist in the api");
      }
    };

    const get_preview_url = async () => {
      const result = await axios.get(
        `http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
      );
      setPreview(result.config.url);
    };

    lib_api();
    get_preview_url();
  }, [isbn]);

  return (
    <div className={classes.root}>
      <div className={classes.backgd}>
        <Paper
          className={classes.paper}
          variant="outlined"
          square
          elevation={3}
        >
          <Grid container spacing={10}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="error loading the pic"
                  src={preview}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Paper
                    className={classes.paper}
                    variant="outlined"
                    square
                    elevation={3}
                  >
                    <h3>Book Name:</h3>
                    {bookname}
                  </Paper>

                  <Paper
                    className={classes.paper}
                    variant="outlined"
                    square
                    elevation={3}
                  >
                    <h3>Author Name:</h3>
                    {author}
                  </Paper>
                  <Paper
                    className={classes.paper}
                    variant="outlined"
                    square
                    elevation={3}
                  >
                    <h3>Isbn:</h3>
                    {isbn}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Paper
            className={classes.paper}
            variant="outlined"
            square
            elevation={3}
          >
            <h3>First Sentence</h3>
            {firstsentence}
          </Paper>
        </Paper>
      </div>
    </div>
  );
}

export default View;
