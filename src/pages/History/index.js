import React, {forwardRef} from 'react';
import {useQuery} from '@apollo/client';
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

import LIST_RENTS from '../../store/gql/query/LIST_RENTS';

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

const History = () => {
  const montaColunas = () => {
    return [
      {title: 'ID', field: 'id', editable: 'never'},
      {title: 'NOME FILME', field: 'name_movie'},
      {title: 'LOCALIZACAO', field: 'location'},
      {title: 'NOME FUNCIONARIO', field: 'name_employee'},
      {title: 'NOME CLIENTE', field: 'name_customer'},
      {title: 'DATA ALUGUEL', field: 'date_rent'},
      {title: 'DATA DEVOLUCAO', field: 'date_refund'},
    ];
  };

  const montaLinhas = (data) => {
    return data.rents.map((detail) => {
      const dateRent = new Date(detail.data_aluguel);
      let dateRefund = '';
      if (!(detail.data_devolucao === null)) {
        dateRefund = new Date(detail.data_devolucao);
      }
      return {
        id: detail.id,
        name_movie: detail.media.movie.name,
        location: detail.media.location,
        name_employee: detail.employee.name,
        name_customer: detail.customer.name,
        date_rent: `${dateRent.getDate()}/${
          dateRent.getMonth() + 1
        }/${dateRent.getFullYear()}`,
        date_refund:
          dateRefund === ''
            ? ''
            : `${dateRefund.getDate()}/${
                dateRefund.getMonth() + 1
              }/${dateRefund.getFullYear()}`,
      };
    });
  };

  const responseApi = useQuery(LIST_RENTS, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <div style={{textAlign: 'center', margin: 50}}>
      <MaterialTable
        title="REGISTROS"
        icons={tableIcons}
        columns={montaColunas()}
        data={montaLinhas(responseApi.data || {})}
      />
    </div>
  );
};

export default History;
