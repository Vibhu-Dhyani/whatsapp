import './ChatLoading.css'


import React from 'react'
import { Skeleton, Stack } from '@mui/material'

const ChatLoading = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" />

      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" />

      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" />

      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
     
    </Stack>
  );
}

export default ChatLoading