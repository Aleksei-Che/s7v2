import StarshipsList from "../components/StarshipsList";

const StarshipsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Starships</h1>
            <StarshipsList />
        </div>
    );
};

export default StarshipsPage;