import React, {forwardRef} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {flatten} from 'ramda';

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

import DELETE_MEDIA from '../../store/gql/mutation/DELETE_MEDIA';
import UPDATE_MEDIA from '../../store/gql/mutation/UPDATE_MEDIA';
import ADD_MEDIA from '../../store/gql/mutation/ADD_MEDIA';
import LIST_MOVIES from '../../store/gql/query/LIST_MEDIAS';

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
    {title: 'ID FILME', field: 'id', editable: 'onAdd'},
    {title: 'NOME FILME', field: 'name', editable: 'never'},
    {title: 'ID MIDIA', field: 'idMedia', editable: 'never'},
    {title: 'DISPONIVEL', field: 'available', editable: 'never'},
    {title: 'LOCALIZACAO', field: 'location'},
  ];
};

const montaLinhas = ({movies = []}) => {
  return flatten(
    movies.map((detail) => {
      return detail.medias.map((d) => {
        return {
          id: detail.id,
          name: detail.name,
          idMedia: d.id,
          available: d.available ? 'Sim' : 'Não',
          location: d.location,
        };
      });
    }),
  );
};

const setValue = (newData, id, available) => {
  return {
    id: newData.id,
    idMedia: id,
    name: newData.name,
    available: available ? 'Sim' : 'Não',
    location: newData.location,
  };
};

const Medias = () => {
  const responseApi = useQuery(LIST_MOVIES, {fetchPolicy: 'cache-and-network'});
  const [addMedia] = useMutation(ADD_MEDIA);
  const [updateMedia] = useMutation(UPDATE_MEDIA);
  const [removeMedia] = useMutation(DELETE_MEDIA);

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
                addMedia: {id, available},
              },
            } = await addMedia({
              variables: {
                input: {
                  movie: newData.id,
                  location: newData.location,
                },
              },
            });

            setState((prevState) => {
              const data = [...prevState.data];
              data.push(setValue(newData, id, available));
              return {...prevState, data};
            });
          },

          onRowUpdate: async (newData, oldData) => {
            const {
              data: {
                updateMedia: {id, available},
              },
            } = await updateMedia({
              variables: {
                input: {
                  id: oldData.idMedia,
                  location: newData.location,
                },
              },
            });

            setState((prevState) => {
              const data = [...prevState.data];
              data[data.indexOf(oldData)] = setValue(newData, id, available);
              return {...prevState, data};
            });
          },

          onRowDelete: async (oldData) => {
            await removeMedia({variables: {id: oldData.idMedia}});

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

export default Medias;
