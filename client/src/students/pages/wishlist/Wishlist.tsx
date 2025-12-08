import Spinner from "@/components/shared/Spinner";
import { useGetMyWishlist } from "@/hooks/wishlist/useGetMyWishlist";
import OutletHeader from "../profile/components/OutletHeader";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";

function Wishlist() {
    const { wishlist, isPending } = useGetMyWishlist();

    if (isPending)
        return (
            <Spinner
                size="large"
                className="w-full! text-primary-700! mt-30!"
            />
        );

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
