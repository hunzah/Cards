import {Button} from "@/components/ui/button";
import s from "./tab-switcher.module.scss"
import {useState} from "react";
import {Typography} from "@/components/ui/typography";

type PropsType = {
    switches:{id: number, switchTitle: string, disabled: boolean}[]
}

const TabSwitcher = (props:PropsType) => {
    const {switches} = props
    const [active,setActive] = useState(1)

    const activeSwitchChanger = (id:number) => {
        setActive(id)
        console.log(`switch number ${id} selected`)
    }

    return (
        <div className={s.tabSwitchersContainer} >
            <Typography variant="body2" component={'h3'}>
                Title
            </Typography>
            <div className={s.tabSwitchers}>
                {switches.map(sw=><button onClick={()=>activeSwitchChanger(sw.id)} key={sw.id} className={sw.id===active? s.activeTabSwitcher: s.tabSwitcher} disabled={sw.disabled}>{sw.switchTitle}</button>)}
            </div>
        </div>
    );
};

export default TabSwitcher;