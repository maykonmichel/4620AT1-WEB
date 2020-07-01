import React, {forwardRef} from 'react';
import {useQuery, useMutation} from '@apollo/client';

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

import DELETE_EMPLOYEE from '../../store/gql/mutation/DELETE_EMPLOYEE';
import UPDATE_EMPLOYEE from '../../store/gql/mutation/UPDATE_EMPLOYEE';
import ADD_EMPLOYEE from '../../store/gql/mutation/ADD_EMPLOYEE';
import LIST_EMPLOYEES from '../../store/gql/query/LIST_EMPLOYEES';

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

const montaColunas = () => {
  return [
    {title: 'ID', field: 'id', editable: 'never'},
    {title: 'NOME', field: 'name'},
    {title: 'RG', field: 'rg'},
    {title: 'PIS', field: 'pis', type: 'numeric'},
  ];
};

const montaLinhas = (data) => {
  return data.employees.map((detail) => {
    return {
      id: detail.id,
      name: detail.name,
      rg: detail.rg,
      pis: detail.pis,
    };
  });
};

const setValue = (newData, id) => {
  return {
    id,
    name: newData.name,
    rg: newData.rg,
    pis: newData.pis,
  };
};

const Employees = () => {
  const responseApi = useQuery(LIST_EMPLOYEES, {
    fetchPolicy: 'cache-and-network',
  });
  const [addEmployee] = useMutation(ADD_EMPLOYEE);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [removeEmployee] = useMutation(DELETE_EMPLOYEE);

  const [state, setState] = React.useState({
    columns: montaColunas(),
    data: montaLinhas(responseApi.data || {}),
  });

  return (
    <div style={{textAlign: 'center', margin: 50}}>
      <MaterialTable
        title="REGISTROS"
        icons={tableIcons}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: async (newData) => {
            const {
              data: {
                addEmployee: {id},
              },
            } = await addEmployee({
              variables: {
                input: {
                  name: newData.name,
                  rg: newData.rg,
                  pis: newData.pis,
                },
              },
            });

            setState((prevState) => {
              const data = [...prevState.data];
              data.push(setValue(newData, id));
              return {...prevState, data};
            });
          },

          onRowUpdate: async (newData, oldData) => {
            const {
              data: {
                updateEmployee: {id},
              },
            } = await updateEmployee({
              variables: {
                input: {
                  id: oldData.id,
                  name: newData.name,
                  rg: newData.rg,
                  pis: newData.pis,
                },
              },
            });

            setState((prevState) => {
              const data = [...prevState.data];
              data[data.indexOf(oldData)] = setValue(newData, id);
              return {...prevState, data};
            });
          },

          onRowDelete: async (oldData) => {
            await removeEmployee({variables: {id: oldData.id}});

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

export default Employees;
