import {useEffect, useState} from 'react';
import {persistCache} from 'apollo-cache-persist';

import api, {cache} from './api';

export default () => {
  const [cachePersisted, setCachePersisted] = useState(false);

  useEffect(() => {
    (async () => {
      await persistCache({
        cache,
        storage: localStorage,
      });
      setCachePersisted(true);
    })();
  }, []);

  return cachePersisted && api;
};
