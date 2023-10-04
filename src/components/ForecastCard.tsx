// temp interface
interface ForecastCardProps {
  location: string;
  image: string;
  temperature: string;
  forecast: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ location, image, temperature, forecast }) => {
  return (
    <div>
      <p>{location}</p>
      <p>{image}</p>
      <p>{temperature}</p>
      <p>{forecast}</p>
    </div>
  );
};

export default ForecastCard;
