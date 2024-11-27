interface ViewMoreButtonProps {
    onClick: () => void;
    loading: boolean;
    hasMore: boolean;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({onClick, loading, hasMore}) => {
    if (!hasMore) return null;

    return (
        <button
        onClick={onClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        disabled={loading}
        >
          {loading ? "Loading more..." : "View More"}
        </button>
    );
};

export default ViewMoreButton;