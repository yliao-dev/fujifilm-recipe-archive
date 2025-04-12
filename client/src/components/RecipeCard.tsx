type RecipeCardProps = {
  title: string;
  image: string;
  description: string;
};

const RecipeCard = ({ title, image, description }: RecipeCardProps) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default RecipeCard;
