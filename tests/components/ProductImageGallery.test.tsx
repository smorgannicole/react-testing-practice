import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing if given an empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    // render fxn returns an obj containing several properties that can be useful when testing- like container...
    // here we are destructuring the obj to extract container property
    // container contains entire dom tree rendered by ProductImageGallery
    expect(container).toBeEmptyDOMElement();
  });

  it("should render a list of images", () => {
    const imageUrls = ["url1", "url2"];

    render(<ProductImageGallery imageUrls={imageUrls} />);

    // tester can't filter images based on src attribute
    // instead, tester has to use getAllByRole to select all images in dom
    const images = screen.getAllByRole("img");
    // 1st, tester should assert there are 2 images
    expect(images).toHaveLength(2);
    // then for each element in arr, should assert that that image has correct src attr
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
      // images[index] accesses the img element at the current index of the images arr
      // .toHaveAttribute("src", url) is a matcher that checks if the img element has a src attr with the value of url at that particular index
    });
  });
});
