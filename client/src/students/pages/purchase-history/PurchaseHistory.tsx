import NoContent from "@/components/shared/NoContent";
import emptyFolderImg from "@/assets/images/empty-folder.png";

function PurchaseHistory() {
    return (
        <NoContent
            imgSrc={emptyFolderImg}
            title="No Purchase History"
            subTitle="Start Purchasing courses"
        />
    );
}

export default PurchaseHistory;
