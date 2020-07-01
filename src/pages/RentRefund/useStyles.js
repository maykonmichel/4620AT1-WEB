import {makeStyles} from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  form: {
    padding: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(1),
    minWidth: 600,
    minHeight: 200,
    flex: 1,
    justifyContent: 'center',
  },
}));
