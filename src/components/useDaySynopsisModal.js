import { useState } from 'react';

const useDaySynopsisModal = () => {
  const [daySynopsisShowing, setDaySynopsisShowing] = useState(false);

  function toggleDaySynopsisShowing() {
    setDaySynopsisShowing(!daySynopsisShowing);
    console.log(daySynopsisShowing)
  }

  return {
    daySynopsisShowing,
    toggleDaySynopsisShowing
  }
}

export default useDaySynopsisModal;