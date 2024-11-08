import { useEffect } from 'react';

const useDisableBodyScroll = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
};

export default useDisableBodyScroll;
