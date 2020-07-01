import React, {useState, forwardRef} from 'react';
import {useQuery, useMutation} from '@apollo/client';
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
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import {Alert} from '@material-ui/lab';
import useStyles from './useStyles';

import LIST_EMPLOYEES from '../../store/gql/query/LIST_EMPLOYEES';
import LIST_CUSTOMERS from '../../store/gql/query/LIST_CUSTOMERS';
import LIST_MOVIES from '../../store/gql/query/LIST_MOVIES';
import LIST_MEDIA from '../../store/gql/query/LIST_MEDIA';
import ADD_RENT from '../../store/gql/mutation/ADD_RENT';
import LIST_RENTS from '../../store/gql/query/LIST_RENTS';
import UPDATE_RENT from '../../store/gql/mutation/UPDATE_RENT';

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
  const [addRent] = useMutation(ADD_RENT);

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
            onClick={async () => {
              if (employee === '' || customer === '' || media === '') {
                setShow('2');
              } else {
                const {
                  data: {
                    addRent: {id},
                  },
                } = await addRent({
                  variables: {
                    input: {
                      id_empregado: employee,
                      id_cliente: customer,
                      id_media: media,
                    },
                  },
                });

                if (id === undefined) {
                  setShow('3');
                } else {
                  setShow('1');
                }
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

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Refund = () => {
  const montaColunas = () => {
    return [
      {title: 'ID', field: 'id', editable: 'never'},
      {title: 'NOME FILME', field: 'name_movie'},
      {title: 'LOCALIZACAO', field: 'location'},
      {title: 'NOME FUNCIONARIO', field: 'name_employee'},
      {title: 'NOME CLIENTE', field: 'name_customer'},
      {title: 'DATA ALUGUEL', field: 'date_rent'},
    ];
  };

  const montaLinhas = (data) => {
    return data.rents.reduce((acc, detail) => {
      const dateRent = new Date(detail.data_aluguel);
      if (detail.data_devolucao === null)
        return [
          ...acc,
          {
            id: detail.id,
            name_movie: detail.media.movie.name,
            location: detail.media.location,
            name_employee: detail.employee.name,
            name_customer: detail.customer.name,
            date_rent: `${dateRent.getDate()}/${
              dateRent.getMonth() + 1
            }/${dateRent.getFullYear()}`,
          },
        ];
      return acc;
    }, []);
  };

  const responseApi = useQuery(LIST_RENTS, {
    fetchPolicy: 'cache-and-network',
  });

  const [updateRent] = useMutation(UPDATE_RENT);

  const [state, setState] = React.useState({
    columns: montaColunas(),
    data: montaLinhas(responseApi.data || {}),
  });

  return (
    <div style={{textAlign: 'center', margin: 50}}>
      <h1>Devolução</h1>
      <MaterialTable
        title="REGISTROS"
        icons={tableIcons}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowDelete: async (oldData) => {
            await updateRent({
              variables: {
                input: {
                  id: oldData.id,
                },
              },
            });

            setState((prevState) => {
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              return {...prevState, data};
            });
          },
        }}
      />
    </div>
  );
};

const RentRefund = () => {
  return (
    <div>
      <Rent />
      <Refund />
    </div>
  );
};

export default RentRefund;
