import Spinner from "@/components/shared/Spinner";
import { useGetMyWishlist } from "@/hooks/wishlist/useGetMyWishlist";
import OutletHeader from "@/components/shared/OutletHeader";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import Error from "@/components/shared/Error";
import NoContent from "@/components/shared/NoContent";
import noWishlistImg from "@/assets/images/empty-wishlist.png";

function Wishlist() {
    const { wishlist, isLoading, error } = useGetMyWishlist();

    if (isLoading)
        return <Spinner size="large" className="text-primary-700! mt-30!" />;
    if (!isLoading && (error || !wishlist)) return <Error />;

    if (!wishlist.wishlist.length)
        return (
            <NoContent
                imgSrc={noWishlistImg}
                title="Empty Wishlist"
                subTitle="Start adding courses to your wishlist"
            />
        );

    return (
        <div className="overflow-x-auto">
            <OutletHeader>Wishlist ({wishlist.wishlist.length})</OutletHeader>
            <table className="w-full border border-gray-300">
                <TableHeader />
                <TableBody wishlist={wishlist.wishlist} />
            </table>
        </div>
    );
}

export default Wishlist;
