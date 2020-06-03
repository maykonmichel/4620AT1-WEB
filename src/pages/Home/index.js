import React, {memo} from 'react';
import {Divider, Grid, Paper} from '@material-ui/core';

import useStyles from './useStyles';

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={5}>
        <Paper className={[classes.paper, classes.form]}>
          <h1>Alunos</h1>
          <p>Gabriel de Mello - 181025728</p>
          <p>Jamilly Souza - 181020416</p>
          <p>Maykon Michel - 181022656</p>
          <Divider />
          <p>
            Código fonte em:
            <a href="https://github.com/maykonmichel/4620AT1">
              {` `}
              https://github.com/maykonmichel/4620AT1
            </a>
          </p>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default memo(Home);
