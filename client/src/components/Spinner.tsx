import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};
type SpinnerProps = {
  loading: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <ClipLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
