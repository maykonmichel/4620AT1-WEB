import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {
  Divider,
  Grid,
  Paper,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  Snackbar,
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import useStyles from './useStyles';

import LIST_EMPLOYEES from '../../store/gql/query/LIST_EMPLOYEES';
import LIST_CUSTOMERS from '../../store/gql/query/LIST_CUSTOMERS';
import LIST_MOVIES from '../../store/gql/query/LIST_MOVIES';
import LIST_MEDIA from '../../store/gql/query/LIST_MEDIA';

const SelectEmployee = ({em, set}) => {
  const employees = useQuery(LIST_EMPLOYEES, {
    fetchPolicy: 'cache-and-network',
  });
  if (employees.data === undefined) {
    return (
      <FormControl variant="outlined" style={{margin: 10, minWidth: 150}}>
        <InputLabel id="employee-input">Filmes</InputLabel>
        <Select />
      </FormControl>
    );
  }
  return (
    <FormControl variant="outlined" style={{margin: 10, minWidth: 150}}>
      <InputLabel id="employee-input">Funcionário</InputLabel>
      <Select
        autoWidth
        labelId="employee-label"
        id="employee"
        value={em}
        onChange={(e) => {
          set(e.target.value);
        }}
        label="employees"
      >
        {employees.data.employees.map((detail) => {
          return (
            <MenuItem value={detail.id} style={{margin: 10, minWidth: 150}}>
              {[detail.name]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const SelectCustomer = ({c, set}) => {
  const customers = useQuery(LIST_CUSTOMERS, {
    fetchPolicy: 'cache-and-network',
  });
  if (customers.data === undefined) {
    return (
      <FormControl variant="outlined" style={{margin: 10, minWidth: 150}}>
        <InputLabel id="customer-input">Filmes</InputLabel>
        <Select />
      </FormControl>
    );
  }
  return (
    <FormControl variant="outlined" style={{margin: 10, minWidth: 150}}>
      <InputLabel id="customer-input">Cliente</InputLabel>
      <Select
        autoWidth
        labelId="customer-label"
        id="customer"
        value={c}
        onChange={(e) => {
          set(e.target.value);
        }}
        label="customers"
      >
        {customers.data.customers.map((detail) => {
          return (
            <MenuItem value={detail.id} style={{margin: 10, minWidth: 150}}>
              {[detail.name]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const SelectMovie = ({m, set}) => {
  const movies = useQuery(LIST_MOVIES, {fetchPolicy: 'cache-and-network'});
  if (movies.data === undefined) {
    return (
      <FormControl variant="outlined" style={{margin: 10, minWidth: 150}}>
        <InputLabel id="movie-input">Filmes</InputLabel>
        <Select />
      </FormControl>
    );
  }
  return (
    <FormControl variant="outlined" style={{margin: 10, minWidth: 150}}>
      <InputLabel id="movie-input">Filmes</InputLabel>
      <Select
        autoWidth
        labelId="movie-label"
        id="movie"
        value={m}
        onChange={(e) => {
          set(e.target.value);
        }}
        label="movies"
      >
        {movies.data.movies.map((detail) => {
          return (
            <MenuItem value={detail.id} style={{minWidth: 150}}>
              {[detail.name]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const SelectMedia = ({m, set, id, rent}) => {
  const media = useQuery(
    LIST_MEDIA,
    {variables: {id}},
    {fetchPolicy: 'cache-and-network'},
  );
  if (id === '' || media.data === undefined) {
    return (
      <FormControl variant="outlined" style={{margin: 10, minWidth: 150}}>
        <InputLabel id="media-input">Mídias</InputLabel>
        <Select />
      </FormControl>
    );
  }

  return (
    <FormControl variant="outlined" style={{margin: 10, minWidth: 150}}>
      <InputLabel id="media-input">Mídias</InputLabel>
      <Select
        autoWidth
        labelId="media-label"
        id="media"
        value={m}
        onChange={(e) => {
          set(e.target.value);
        }}
        label="medias"
      >
        {media.data.movie.medias.map((detail) => {
          if (detail.available && rent) {
            return (
              <MenuItem value={detail.id} style={{minWidth: 150}}>
                {[detail.location]}
              </MenuItem>
            );
          }
          return (
            <MenuItem disabled value={detail.id} style={{minWidth: 150}}>
              {[detail.location]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const Alerta = ({show, set}) => {
  if (show === '1') {
    return (
      <Snackbar
        open
        autoHideDuration={6000}
        onClose={() => {
          set('');
        }}
      >
        <Alert
          onClose={() => {
            set('');
          }}
          severity="success"
        >
          Foi possível realizar a ação
        </Alert>
      </Snackbar>
    );
  }
  if (show === '2') {
    return (
      <Snackbar
        open
        autoHideDuration={6000}
        onClose={() => {
          set('');
        }}
      >
        <Alert
          onClose={() => {
            set('');
          }}
          severity="error"
        >
          Preencha todos os campos
        </Alert>
      </Snackbar>
    );
  }
  if (show === '3') {
    return (
      <Snackbar
        open
        autoHideDuration={6000}
        onClose={() => {
          set('');
        }}
      >
        <Alert
          onClose={() => {
            set('');
          }}
          severity="error"
        >
          Não foi possível realizar a ação
        </Alert>
      </Snackbar>
    );
  }

  return <div />;
};

const Rent = () => {
  const [employee, setEmployee] = useState('');
  const [customer, setCustomer] = useState('');
  const [movie, setMovie] = useState('');
  const [media, setMedia] = useState('');
  const [show, setShow] = useState('');

  const classes = useStyles();

  return (
    <Grid>
      <Alerta show={show} set={setShow} />
      <Grid className={[classes.paper, classes.form]}>
        <Paper className={[classes.paper, classes.form]}>
          <h1 style={{textAlign: 'center', margin: 30}}>Aluguel</h1>
          <Divider />
          <SelectEmployee em={employee} set={setEmployee} />
          <SelectCustomer c={customer} set={setCustomer} />
          <SelectMovie m={movie} set={setMovie} />
          <SelectMedia m={media} set={setMedia} id={movie} rent />
          <Button
            style={{margin: 20}}
            justify="center"
            variant="contained"
            color="primary"
            onClick={() => {
              if (employee === '' || customer === '' || media === '') {
                setShow('2');
              } else {
                setShow('1');
              }
            }}
          >
            Alugar
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

const Refund = () => {
  const [employee, setEmployee] = useState('');
  const [customer, setCustomer] = useState('');
  const [movie, setMovie] = useState('');
  const [media, setMedia] = useState('');

  const classes = useStyles();

  return (
    <Grid className={[classes.paper, classes.form]}>
      <Paper className={[classes.paper, classes.form]}>
        <h1 style={{textAlign: 'center', margin: 30}}>Devolução</h1>
        <Divider />

        <SelectEmployee em={employee} set={setEmployee} />
        <SelectCustomer c={customer} set={setCustomer} />
        <SelectMovie m={movie} set={setMovie} />
        <SelectMedia m={media} set={setMedia} id={movie} rent={false} />
        <Button
          style={{margin: 20}}
          justify="center"
          variant="contained"
          color="primary"
          onClick={() => {}}
        >
          Devolver
        </Button>
      </Paper>
    </Grid>
  );
};

const RentRefund = () => {
  return (
    <div>
      <Rent />
      <br />
      <Refund />
    </div>
  );
};

export default RentRefund;
