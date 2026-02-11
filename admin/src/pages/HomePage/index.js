/*
 *
 * HomePage
 *
 */

import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import { LoadingIndicatorPage } from '@strapi/helper-plugin';
import pluginPkg from '../../../../package.json';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import { BaseHeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import Trash from '../../components/TrashIcon';
import cachePurgeRequests from '../../api/cache-request';
const name = "Purge Cache";

const HomePage = () => {
  const [isButton1Loading, setIsButton1Loading] = useState(false);
  const [isButton2Loading, setIsButton2Loading] = useState(false);

  const handleSubmit = async (cache_type) =>{
    let res = {};
    if(cache_type === 'short_cache'){
      setIsButton1Loading(true);
      res = await cachePurgeRequests.short_cache();
      setIsButton1Loading(false);
    } else if(cache_type === 'purge_all'){
      setIsButton2Loading(true);
      res = await cachePurgeRequests.purge_all();
      setIsButton2Loading(false);
    }
  };
  return (
    <>
     <BaseHeaderLayout
        title={name}
        subtitle="Clear Website Cache"
        as="h2"
      />
      <ContentLayout>
      <Typography variant="delta" as="h2"></Typography>
      <Grid gap={6}>

        <GridItem col={8} s={8}>
         <Typography variant="delta" as="h2">Clear Short-Lived Cache</Typography>
         <Typography variant="omega" as="p" style={{ marginTop: '8px', color: '#666' }}>
           Removes cached GraphQL responses with short TTL (max age). Recommended for clearing content updates.
         </Typography>
        </GridItem>
        <GridItem col={4} s={4}>
            <Button
              onClick={() => handleSubmit('short_cache')}
              startIcon={<Trash />}
              size="M"
              disabled={isButton1Loading}
              loading={isButton1Loading}
            >
              Clear Short Cache
            </Button>
        </GridItem>

        <GridItem col={8} s={8}>
          <Typography variant="delta" as="h2">Clear All GraphQL Cache</Typography>
          <Typography variant="omega" as="p" style={{ marginTop: '8px', color: '#666' }}>
            Removes all Apollo GraphQL cached responses from Redis. May cause temporary performance impact until cache is rebuilt.
          </Typography>
        </GridItem>
        <GridItem col={4} s={4}>
      <Button
              onClick={() => handleSubmit('purge_all')}
              startIcon={<Trash />}
              size="M"
              disabled={isButton2Loading}
              loading={isButton2Loading}
              variant="danger-light"
            >
              Clear All Cache
            </Button>
        </GridItem>
      </Grid>
     
      </ContentLayout>
    </>
  );
};

export default HomePage;
