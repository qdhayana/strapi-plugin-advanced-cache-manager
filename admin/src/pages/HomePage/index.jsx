import React, { useState } from 'react';
import { 
  Typography,
  Button,
  Main,
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
    <Main>
    <Box padding={8} background="neutral900" style={{ minHeight: '100vh' }}>
      {/* Header Section */}
      <Box paddingBottom={6}>
        <Typography variant="alpha" as="h1" textColor="neutral0">
          Purge Cache
        </Typography>
        <Typography variant="epsilon" textColor="neutral200">
          Clear Website Cache
        </Typography>
      </Box>
      
      {/* Cache Options Section */}
      <Flex direction="column" gap={6}>
        {/* Option 1 */}
        <Flex justifyContent="space-between" alignItems="center">
          <Typography variant="delta" textColor="neutral0">
            1. Clear content related short cache.
          </Typography>
          <Button
            onClick={() => handleSubmit('short_cache')}
            startIcon={<Trash />}
            variant="secondary"
            disabled={isButton1Loading}
            loading={isButton1Loading}
            style={{
              backgroundColor: '#4945FF',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              minWidth: '100px'
            }}
          >
            Clear
          </Button>
        </Flex>

        {/* Option 2 */}
        <Flex justifyContent="space-between" alignItems="center">
          <Typography variant="delta" textColor="neutral0" style={{ maxWidth: '70%' }}>
            2. Clear all website cache, website will have a performance hit before cache regenerated.
          </Typography>
          <Button
            onClick={() => handleSubmit('purge_all')}
            startIcon={<Trash />}
            variant="secondary"
            disabled={isButton2Loading}
            loading={isButton2Loading}
            style={{
              backgroundColor: '#4945FF',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              minWidth: '100px'
            }}
          >
            Clear
          </Button>
        </Flex>

        {/* Option 3 */}
        <Flex justifyContent="space-between" alignItems="center">
          <Typography variant="delta" textColor="neutral0" style={{ maxWidth: '70%' }}>
            3. Clear AWS CDN cache for all pages and assets. It may takes up to 10 mins.
          </Typography>
          <Button
            onClick={() => handleSubmit('purge_cdn')}
            startIcon={<Trash />}
            variant="secondary"
            disabled={isButton3Loading}
            loading={isButton3Loading}
            style={{
              backgroundColor: '#4945FF',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              minWidth: '100px'
            }}
          >
            Clear
          </Button>
        </Flex>
      </Flex>
    </Box>
  </Main>
  );
};

export default HomePage;