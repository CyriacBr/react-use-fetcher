import React, { useEffect, useState } from 'react';
import { useFetcher, Fetcher } from 'use-fetcher-react';
import axios from 'axios';

import 'use-fetcher-react/dist/styles.css';
import '../index.css';

const MinimalExample = () => {
  const fetcher = useFetcher();
  const [title, setTitle] = useState('No todo title');
  useEffect(() => {
    let randomId = Math.round(Math.random() * 100) + 1;
    let request = axios.get(`https://jsonplaceholder.typicode.com/todos/${randomId}`);
    fetcher.fetch(request, data => {
      setTitle(`A random todo title: ${data.title}`);
    });
  }, []);

  return (
    <div className="test-container">
      <Fetcher fetcher={fetcher}>
        <span>{title}</span>
      </Fetcher>
    </div>
  );
};

export default MinimalExample;
