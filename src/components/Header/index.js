import React, {memo, useCallback} from 'react';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import HeaderItem from '../HeaderItem';

import useStyles from './useStyles';

import logo from '../../assets/images/logo.png';

const Header = memo(() => {
  const classes = useStyles();

  const history = useHistory();

  const navigateToHome = useCallback(() => history.push('/'), [history]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={navigateToHome}
          >
            <img src={logo} alt="" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            1º trabalho - Banco de dados: locadora
          </Typography>
          <HeaderItem path="/history" title="Historico" />
          <HeaderItem path="/rent-refund" title="Aluguel" />
          <HeaderItem path="/employees" title="Funcionarios" />
          <HeaderItem path="/customers" title="Clientes" />
          <HeaderItem path="/movies" title="Filmes" />
          <HeaderItem path="/medias" title="Midias" />
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default Header;
