import {useState} from 'react'

import {clsx} from 'clsx'
import {useDispatch} from 'react-redux'

import s from './tab-switcher.module.scss'

import {Typography} from '@/components/ui/typography'
import {setMyAuthorId, updateCurrentPage} from '@/services/decks/decks.slice'
import {useAppSelector} from "@/hooks";
import {Button} from "@/components/ui/button";

type PropsType = {
    className?: string
}
//todo sortId on 20 line I Commented it out so the error doesn't appear
export const TabSwitcher = (props: PropsType) => {
    const {title, className} = props
    const dispatch = useDispatch()
    const myAuthorId = useAppSelector(state => state.decks.myAuthorId)
    const userId = useAppSelector(state => state.auth.me.id)
    const [active, setActive] = useState(myAuthorId ? "my" : 'all')

    const activeSwitchChanger = (switchTitle: string, id: string) => {
        setActive(switchTitle)
        dispatch(setMyAuthorId(id))
        dispatch(updateCurrentPage(1))
    }
    const classNames = {
        tabSwitchersContainer: clsx(s.tabSwitchersContainer, className),
    }
    console.log(active)
    return (
        <div className={classNames.tabSwitchersContainer}>
            <Typography variant="body2" component={'h3'}>
                Show packs cards
            </Typography>
            <div className={s.tabSwitchers}>

                <Button className={"all" === active ? s.activeTabSwitcher : s.tabSwitcher}
                        onClick={() => activeSwitchChanger("all", "")}
                >
                    <Typography variant="body2" component={'span'}>
                        All
                    </Typography>
                </Button>
                <Button className={"my" === active ? s.activeTabSwitcher : s.tabSwitcher}
                        onClick={() => activeSwitchChanger("my", userId)}


                >
                    <Typography variant="body2" component={'span'}>
                        My
                    </Typography>
                </Button>

            </div>
        </div>
    )
}
