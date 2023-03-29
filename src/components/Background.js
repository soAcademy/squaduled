import React from 'react';
import Box from '@mui/material/Box';

const styles = {
  backgroundImage: `url('https://cdn.pixabay.com/photo/2016/09/05/21/37/cat-1647775_960_720.jpg')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100vh',
};

const MyComponent = () => {
  return (
    <Box sx={styles}>
      {/* Your content goes here */}
    </Box>
  );
}

export default MyComponent;
