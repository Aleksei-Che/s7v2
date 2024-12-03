import { useParams } from "react-router-dom";
import StarshipDetail from "../components/StarshipDetail";

const StarshipDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="container mx-auto p-4">
            <StarshipDetail starshipId={id} />
        </div>
    );
};

export default StarshipDetailPage;