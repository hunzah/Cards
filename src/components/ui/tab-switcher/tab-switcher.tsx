import {Button} from "@/components/ui/button";
import s from "./tab-switcher.module.scss"
import {useState} from "react";
import {Typography} from "@/components/ui/typography";

type PropsType = {
    switches:number[]
}

const TabSwitcher = () => {
    const [active,setActive] = useState(true)
    return (
        <div className={s.tabSwitchersContainer} >
            <Typography variant="body2" component={'h3'}>
                Title
            </Typography>
            <div className={s.tabSwitchers}>
                <button  className={s.tabSwitcher}>tabSwitcher</button>
                <button className={s.tabSwitcher}>tabSwitcher</button>
                <button onClick={()=>console.log("asdasd")} className={s.tabSwitcher} disabled>tabSwitcher</button>
            </div>
        </div>
    );
};

export default TabSwitcher;