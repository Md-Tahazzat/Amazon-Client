import { ProductType } from "../../tsInterfaces&types/Products";
import AboutProduct from "./AboutProduct";
import AddToCart from "./AddToCart";
import ProductDetails from "./ProductDetails";
import ProductPrice from "./ProductPrice";
import TitleAndRatings from "./TitleAndRatings";

const Details = ({ product }: { product: ProductType }) => {
  return (
    <div className="w-full lg:w-7/12 flex flex-col-reverse lg:gap-3 lg:flex-row items-start">
      <div className="w-full lg:w-[72%]">
        {/* title & details */}
        <TitleAndRatings
          className="hidden lg:block"
          title={product.title ? product.title : ""}
          ratings={product.ratings_info}
          showMoreDetails={true}
          // @ts-ignore
          storeName={product.product_details?.Brand}
        />

        {/* product price */}
        <ProductPrice className="hidden lg:block" price={product.price} />

        {/* product information (Brand, model etc) */}
        <ProductDetails productDetails={product.product_details} />

        {/* about product */}
        <AboutProduct about={product.about} />
      </div>

      {/* add to cart info */}
      <div className="w-full lg:w-[28%] pb-2 mb-2 border-b-2 lg:p-4  lg:top-1 lg:border">
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default Details;
