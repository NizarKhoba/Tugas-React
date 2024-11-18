import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import { Link } from "react-router-dom";

export default function Card({ product }) {
  const isOutOfStock = product.stock <= 0;
  const isAlmostSoldOut = product.stock > 0 && product.stock <= 2;

  return (
    <Link
      to={`/products/${product.slug ?? ""}`}
      className="flex flex-col max-w-[370px] p-[16px] bg-[#1a202c] rounded-3xl hover:ring-4 hover:ring-opacity-40 active:ring-2 active:ring-[#6247eb] active:ring-opacity-90"
    >
      {/* Gambar Produk */}
      <img
        src={product.imageUrl ?? ""}
        alt={product.name ?? "No Name"}
        className="block max-h-[300px] mb-4 object-cover rounded-2xl"
      />

      {/* Detail Produk */}
      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-[20px] text-white">
          {product.name ?? "No Name"}
        </h4>
        <span className="block font-medium text-[14px] text-[#eaeaea]">
          {product.category ?? "Uncategorized"}
        </span>
        <span className="block font-medium text-[20px] text-white">
          {formatToIDRCurrency(product.price) ?? "Not for Sale"}
        </span>

        {/* Status dan Tombol */}
        <div>
          {isOutOfStock ? (
            <p className="text-xl font-semibold text-red-500">Out of Stock</p>
          ) : isAlmostSoldOut ? (
            <>
              <p className="text-xl font-semibold text-yellow-500 mb-4">
                Almost Sold Out
              </p>
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-red-500 text-center text-white rounded-md hover:bg-red-400 active:bg-red-600"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span>Add to cart</span>
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="inline-flex items-center justify-center gap-2 p-4 bg-red-500 text-center text-white rounded-md hover:bg-red-400 active:bg-red-600"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span>Add to cart</span>
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number,
    imageUrl: PropTypes.string,
  }).isRequired,
};
