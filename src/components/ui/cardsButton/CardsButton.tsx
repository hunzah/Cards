import s from "../cardsButton/CardsButton.module.scss"

export const CardsButton = (props:any) => {
    return (
        <div className={s.CardsButton}>
            {props.children}
        </div>
    )
}