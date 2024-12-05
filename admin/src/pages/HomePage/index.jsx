import React, { useState } from 'react';
import { 
  Typography,
  Button,
  Layout,
  Grid,
  Box,
  Flex
} from '@strapi/design-system';
import { Trash } from '@strapi/icons';
import cachePurgeRequests from '../../api/cache-request';

const name = "Purge Cache";

const HomePage = () => {
  const [isButton1Loading, setIsButton1Loading] = useState(false);
  const [isButton2Loading, setIsButton2Loading] = useState(false);
  const [isButton3Loading, setIsButton3Loading] = useState(false);

  const handleSubmit = async (cache_type) => {
    let res = {};
    if(cache_type === 'short_cache'){
      setIsButton1Loading(true);
      res = await cachePurgeRequests.short_cache();
      setIsButton1Loading(false);
    } else if(cache_type === 'purge_all'){
      setIsButton2Loading(true);
      res = await cachePurgeRequests.purge_all();
      setIsButton2Loading(false);
    } else if(cache_type === 'purge_cdn'){
      setIsButton3Loading(true);
      res = await cachePurgeRequests.purge_cdn();
      setIsButton3Loading(false);
    }
  };

  return (
    <>
      <Layout>
        <Layout.Header 
          title={name}
          subtitle="Clear Website Cache"
          as="h2"
        />
        <Layout.Content>
          <Box padding={4}>
            <Grid gap={6}>
              <Flex gap={4}>
                <Box flex={6}>
                  <Typography variant="delta" as="h2">
                    1. Clear content related short cache.
                  </Typography>        
                </Box>
                <Box flex={4}>
                  <Button
                    onClick={() => handleSubmit('short_cache')}
                    startIcon={<Trash />}
                    size="M"
                    disabled={isButton1Loading}
                    loading={isButton1Loading}
                  >
                    Clear
                  </Button>
                </Box>   
              </Flex>

              <Flex gap={4}>
                <Box flex={6}>
                  <Typography variant="delta" as="h2">
                    2. Clear all website cache, website will have a performance hit before cache regenerated.
                  </Typography>        
                </Box>
                <Box flex={4}>
                  <Button
                    onClick={() => handleSubmit('purge_all')}
                    startIcon={<Trash />}
                    size="M"
                    disabled={isButton2Loading}
                    loading={isButton2Loading}
                  >
                    Clear
                  </Button>
                </Box>
              </Flex>

              <Flex gap={4}>
                <Box flex={6}>
                  <Typography variant="delta" as="h2">
                    3. Clear AWS CDN cache for all pages and assets. It may takes up to 10 mins.
                  </Typography>        
                </Box>
                <Box flex={4}>
                  <Button
                    onClick={() => handleSubmit('purge_cdn')}
                    startIcon={<Trash />}
                    size="M"
                    disabled={isButton3Loading}
                    loading={isButton3Loading}
                  >
                    Clear
                  </Button>
                </Box>
              </Flex>
            </Grid>
          </Box>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default HomePage;