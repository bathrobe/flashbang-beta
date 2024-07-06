interface ImageHolderProps {
  src: string
  alt?: string
}
const ImageHolder: React.FC<ImageHolderProps> = ({ src, alt = 'Scene Image' }) => {
  return (
    <div className="w-1/2 flex items-center justify-center">
      <img src={src} alt={alt} className="w-full h-full object-cover rounded-lg" />
    </div>
  )
}

export default ImageHolder
