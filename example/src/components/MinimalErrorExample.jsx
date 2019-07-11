import React, { useEffect } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';

import 'use-fetcher-react/dist/styles.css';
import '../index.css';

const MinimalErrorExample = () => {
  const fetcher = useFetcher();
  useEffect(() => {
    fetcher.setError({
      message: 'Oopies, something went wrong',
      status: 404
    });
  }, []);

  return (
    <div className="test-container">
      <Fetcher fetcher={fetcher}>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum accumsan
          lorem, id tristique erat. Ut elementum dui lobortis ex eleifend eleifend. Curabitur
          scelerisque odio ac tellus volutpat, nec tempor justo tristique. Vivamus tincidunt sem nec
          ornare tempor. Maecenas at tellus ac arcu convallis pulvinar. Cras cursus, massa ut varius
          laoreet, sem dui faucibus nulla, in imperdiet lacus nulla vitae ante. Mauris nec sapien
          tristique, placerat sapien vel, suscipit magna. Cras purus risus, blandit at quam quis,
          luctus feugiat nisl. Duis ultrices semper eros, vel sagittis sapien pharetra in. Fusce est
          mauris, rhoncus et molestie ut, faucibus non tortor. Vivamus accumsan blandit consectetur.
        </span>
      </Fetcher>
    </div>
  );
};

export default MinimalErrorExample;
