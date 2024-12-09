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
    if (cache_type === 'short_cache') {
      setIsButton1Loading(true);
      res = await cachePurgeRequests.short_cache();
      setIsButton1Loading(false);
    } else if (cache_type === 'purge_all') {
      setIsButton2Loading(true);
      res = await cachePurgeRequests.purge_all();
      setIsButton2Loading(false);
    } else if (cache_type === 'purge_cdn') {
      setIsButton3Loading(true);
      res = await cachePurgeRequests.purge_cdn();
      setIsButton3Loading(false);
    }
  };

  return (
    <Main>
      <Box padding={8} background="neutral100">
        <Box paddingBottom={4}>
          <Typography variant="alpha" as="h1">
            {name}
          </Typography>
          <Typography variant="epsilon">Clear Website Cache</Typography>
        </Box>

        <Box padding={4} background="neutral0" shadow="filterShadow">
          <Flex direction="column" gap={6} alignItems="left">
            <Flex gap={4} alignItems="left">
              <Box flex={6}>
                <Typography variant="delta">
                  1. Clear content related short cache.
                </Typography>
              </Box>
              <Box flex={4}>
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
              </Box>
            </Flex>

            <Flex gap={4} alignItems="left">
              <Box flex={6}>
                <Typography variant="delta">
                  2. Clear all website cache, website will have a performance hit before cache regenerated.
                </Typography>
              </Box>
              <Box flex={4}>
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
              </Box>
            </Flex>

            <Flex gap={4} alignItems="left">
              <Box flex={6}>
                <Typography variant="delta">
                  3. Clear AWS CDN cache for all pages and assets. It may takes up to 10 mins.
                </Typography>
              </Box>
              <Box flex={4}>
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
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Main>
  );
};

export default HomePage;