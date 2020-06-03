import React, {memo} from 'react';
import {useQuery} from '@apollo/client';

import MOVIES from '../../store/gql/query/MOVIES';

const Movies = () => {
  const {data} = useQuery(MOVIES);

  return <div>{JSON.stringify(data)}</div>;
};

export default memo(Movies);
