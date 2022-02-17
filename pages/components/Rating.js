import { FaStar, FaRegStar } from "react-icons/fa";

function Rating({ filled, color }) {
  return filled ? <FaStar color={color} /> : <FaRegStar color={color} />;
}

export default Rating;
