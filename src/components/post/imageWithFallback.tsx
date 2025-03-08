import { useState } from 'react';
import { LoadingImage } from '../loading';
import { AlertCircle } from 'lucide-react';

const ImageWithFallback = ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <div>
      <div className='relative top-64'>
        <div className='flex flex-col items-center justify-center'>
          <AlertCircle />
          <p>Can't get image!</p>
        </div>
      </div>
      <LoadingImage />
    </div>
  ) : (
    <img
      {...props}
      className='h-[30rem] w-full object-cover'
      loading='lazy'
      onClick={(e) => e.stopPropagation()}
      onError={(e) => {
        setHasError(true);
        props.onError?.(e); // Preserve any custom onError handler
      }}
    />
  );
};
export default ImageWithFallback;
