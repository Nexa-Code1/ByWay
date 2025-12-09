import Spinner from "@/components/shared/Spinner";
import { useGetMyWishlist } from "@/hooks/wishlist/useGetMyWishlist";
import OutletHeader from "../profile/components/OutletHeader";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import Error from "@/components/shared/Error";

function Wishlist() {
    const { wishlist, isLoading, error } = useGetMyWishlist();

    if (isLoading)
        return <Spinner size="large" className="text-primary-700! mt-30!" />;
    if (!isLoading && (error || !wishlist)) return <Error />;

    return (
        <div>
            <OutletHeader>Wishlist ({wishlist.wishlist.length})</OutletHeader>
            <table className="w-full border border-gray-300">
                <TableHeader />
                <TableBody wishlist={wishlist.wishlist} />
            </table>
        </div>
    );
}

export default Wishlist;
