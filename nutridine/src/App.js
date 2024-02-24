import React from 'react';
import './App.css';
import { useColorMode, Button } from '@chakra-ui/react';

function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontWeight: 'bold',
      flexDirection:'column'
    }}>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <div>
        HELLLLOOO NEW NUTRIDINE
      </div>
    </div>
    
  );
}

export default App;
