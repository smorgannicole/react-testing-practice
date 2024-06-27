// need 2 test case here
// 1st should pass empty arr to component and assert dom is empty
// 2nd should pass arr of urls to component and assert there's a list of images with correct src attribute rendered in dom

const ProductImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  if (imageUrls.length === 0) return null;

  return (
    <ul>
      {imageUrls.map((url) => (
        <li key={url}>
          <img src={url} />
        </li>
      ))}
    </ul>
  );
};

export default ProductImageGallery;
