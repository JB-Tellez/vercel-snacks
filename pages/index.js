import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default function Home() {


  const [resources, setResources] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = {
        username: 'jb',
        password: 'jb',
      }

      const baseUrl = 'https://lightsail-snacks.9hg33nqeuilhu.us-west-2.cs.amazonlightsail.com';

      const tokenResponse = await axios.post(baseUrl + '/api/token/', data);

      const tokens = tokenResponse.data;

      const resourceResponse = await axios.get(baseUrl + '/api/v1/snacks/', config(tokens));

      setResources(resourceResponse.data);


    }
    fetchData();
  }, []);

  function config(tokens) {

    return {
      headers: {
        'Authorization': 'Bearer ' + tokens.access
      }
    };
  }

  return (
    <div>
      {JSON.stringify(resources)}
    </div>
  )
}
