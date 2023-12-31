import { CommentType } from "../../tsInterfaces&types/Products";
import Comment from "./Comment";

const ProductComments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div className="w-full lg">
      <h1 className="text-2xl text-center mt-20 mb-6 lg:mt-32 font-semibold">
        Customer reviews
      </h1>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default ProductComments;
