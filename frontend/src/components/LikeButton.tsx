import starFill from '@/assets/star-fill.svg';
import starLine from '@/assets/star-line.svg';

type LikeButtonProps = {
  isLiked: boolean;
  onToggle: () => void;
};

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="mt-1 hover:scale-110 transition-transform hover:cursor-pointer "
      aria-label={isLiked ? 'Unlike this photo' : 'Like this photo'}
    >
      <img
        src={isLiked ? starFill : starLine}
        alt={isLiked ? 'Unlike' : 'Like'}
        className={`w-5 h-5 ${isLiked ? 'star-liked' : 'star-unliked'}`}
      />
    </button>
  );
};
export default LikeButton;
