import noCardsImg from "@/assets/images/no-cards.png";
import TextDescription from "@/components/shared/TextDescription";

function NoCards() {
    return (
        <div className="max-w-80 mx-auto flex flex-col items-center text-center">
            <img src={noCardsImg} alt="no saved cards" />
            <p className="font-medium mb-3">No Saved Cards</p>
            <TextDescription>
                Looks like you have not saved any credit cards yet, click on the
                button to add the first one.
            </TextDescription>
        </div>
    );
}

export default NoCards;
